import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";
import jwt from "jsonwebtoken";
import { genSalt, hash, compare } from "bcrypt";
import geoip from "geoip-lite";

import User, { UserType } from "../models/user";
import Session, { SessionType } from "../models/session";
import Token, { TokenType } from "../models/token";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRATION,
} from "../constants";

const createToken = async (type: string, userId: string, sessionId: string) => {
  const secret = process.env.JWT_SECRET;
  const expireDate =
    type === ACCESS_TOKEN ? ACCESS_TOKEN_EXPIRATION : REFRESH_TOKEN_EXPIRATION;
  const token: string = jwt.sign(
    {
      id: userId,
      session: sessionId,
      type,
    },
    secret,
    { expiresIn: expireDate }
  );

  const tokenInDb: TokenType = new Token({
    token: token,
    type: type,
    user: userId,
    expiresAt: expireDate,
    session: sessionId,
  });

  await tokenInDb.save();

  return {
    token,
    db: tokenInDb,
  };
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const password = req.body.password;
    const email = req.body.email;

    const user: UserType = await User.findOne({
      email: email,
    });

    if (user) {
      const validPassword = await compare(password, user.password);
      if (validPassword) {
        // Create session
        const response = await createSession(
          user,
          req.device.type.toLowerCase(),
          req.ip
        );

        res.status(200).json({
          success: true,
          access: response.access,
          refresh: response.refresh,
        });
      }
    }
    next(new ExpressError("Invalid credentials", 500));
  } catch (error) {
    next(new ExpressError(error.toString(), 500));
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    const email = req.body.email;

    // Hash password
    const salt = await genSalt(10);
    const password = await hash(req.body.password, salt);

    const user: UserType = new User({
      name,
      email,
      password,
    });

    await user.save();

    // Create session
    const response = await createSession(
      user,
      req.device.type.toLowerCase(),
      req.ip
    );

    res.status(200).json({
      success: true,
      user,
      access: response.access,
      refresh: response.refresh,
    });
  } catch (error) {
    next(new ExpressError(error.toString(), 500));
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenType = res.locals.tokenType;
    const userId = res.locals.userId;
    const sessionId = res.locals.sessionId;

    if (tokenType !== REFRESH_TOKEN) {
      next(new ExpressError("Invalid Token Type", 400));
    }

    // Delete any existing access tokens
    // on the current session
    await Token.deleteMany({
      session: sessionId,
      type: ACCESS_TOKEN,
    });

    // Create a new access token
    const access = await createToken(ACCESS_TOKEN, userId, sessionId);

    res.status(200).json({
      success: true,
      access: access.token,
    });
  } catch (error) {
    next(new ExpressError(`There was an error ${error.toString()}`, 500));
  }
};

export const generateTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenType = res.locals.tokenType;
    const userId = res.locals.userId;
    const sessionId = res.locals.sessionId;

    if (tokenType !== ACCESS_TOKEN) {
      next(new ExpressError("Invalid Token Type", 400));
    }

    // Delete any existing tokens
    // on the current session
    await Token.deleteMany({
      session: sessionId,
    });

    // Create a new tokens
    const access = await createToken(ACCESS_TOKEN, userId, sessionId);
    const refresh = await createToken(REFRESH_TOKEN, userId, sessionId);

    res.status(200).json({
      success: true,
      access: access.token,
      refresh: refresh.token,
    });
  } catch (error) {
    next(new ExpressError(`There was an error ${error.toString()}`, 500));
  }
};

export const createSession = async (
  user: UserType,
  device: string,
  ip: string
) => {
  const geo = geoip.lookup(ip);
  const city = geo.city;

  const session: SessionType = new Session({
    user: user._id,
    device: device,
    city: city,
    ip: ip,
  });

  // Create tokens
  const access = await createToken(ACCESS_TOKEN, user._id, session._id);
  const refresh = await createToken(REFRESH_TOKEN, user._id, session._id);

  await session.save();

  return {
    access: access.token,
    refresh: refresh.token,
  };
};

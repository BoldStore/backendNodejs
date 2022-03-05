import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";
import jwt from "jsonwebtoken";

import User, { UserType } from "../models/user";
import Token, { TokenType } from "../models/token";
import Session from "../models/session";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret: string = process.env.JWT_SECRET;
  const token: any = req.headers.token;

  try {
    const tokenInDb: TokenType = await Token.findOne({
      token: token,
      expiresAt: { $gt: new Date() },
    }).populate("session");
    if (!tokenInDb) {
      next(new ExpressError("Invalid Token", 400));
    }
    if (tokenInDb.session instanceof Session && !tokenInDb.session.isActive) {
      next(new ExpressError("Session inactive", 400));
    }

    const decoded: any = jwt.verify(token, secret);
    if (decoded.exp < Date.now()) {
      next(new ExpressError("Token Expired", 400));
    }
    if (!decoded.session) {
      next(new ExpressError("Session not found", 400));
    }
    if (
      tokenInDb.session instanceof Session &&
      decoded.session !== tokenInDb.session.id
    ) {
      next(new ExpressError("Invalid Session", 400));
    }

    res.locals.tokenType = decoded.type;
    res.locals.userId = decoded.user;
    res.locals.sessionId = decoded.session;

    next();
  } catch (error) {
    next(new ExpressError(`You are not authorized: ${error}`, 403));
  }
};

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateToken(req, res, async () => {
    try {
      const userId: string = res.locals.userId;
      const user: UserType = await User.findById(userId);
      if (!user) {
        next(new ExpressError("User not found", 404));
      }
      res.locals.user = user;
      next();
    } catch (error) {
      next(new ExpressError(`You are not authorized: ${error}`, 403));
    }
  });
};

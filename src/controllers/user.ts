import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";

import User, { UserType } from "../models/user";

export const updateDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.userId;
    const name = req.body.password;
    const identity = req.body.identity;
    const birthday = req.body.birthday;

    const user: UserType = await User.findByIdAndUpdate(userId, {
      name: name,
      identity: identity,
      birthday: birthday,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ExpressError(`There was an error: ${error.toString()}`, 500));
  }
};

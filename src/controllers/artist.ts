import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";

import User, { UserType } from "../models/user";
import Artist, { ArtistType } from "../models/artist";

export const becomeAnArtist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.userId;
    const about = req.body.about;

    const artist: ArtistType = new Artist({
      about: about,
      user: userId,
    });

    await artist.save();

    const user = await User.findByIdAndUpdate(userId, {
      artist: artist._id,
    });

    res.status(200).json({
      success: true,
      artist,
      user,
    });
  } catch (error) {
    next(new ExpressError(`There was an error: ${error.toString()}`, 500));
  }
};

export const updateAristDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: UserType = res.locals.user;
    const about: string = req.body.about;

    const artist: ArtistType = await Artist.findByIdAndUpdate(user.artist, {
      about: about,
    });

    res.status(200).json({
      success: true,
      artist,
    });
  } catch (error) {
    next(new ExpressError(`There was an error: ${error.toString()}`, 500));
  }
};

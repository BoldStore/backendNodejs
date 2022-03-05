import { Schema, Document, model, ObjectId } from "mongoose";
import { USER, EVENT, FAVORITE } from "../models";

export interface FavoriteType extends Document {
  user: ObjectId;
  event: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: EVENT,
      required: true,
    },
  },
  { timestamps: true }
);

const Favorite = model<FavoriteType>(FAVORITE, FavoriteSchema);
export default Favorite;

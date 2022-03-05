import mongoose, { ObjectId, Schema } from "mongoose";
import { ARTIST, FILE, USER } from "../models";

export interface ArtistType extends mongoose.Document {
  about: string;
  cover: ObjectId;
  user: ObjectId;
}

const ArtistSchema = new Schema(
  {
    about: {
      type: String,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: FILE,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
    },
  },
  { timestamps: true }
);

const Artist = mongoose.model<ArtistType>(ARTIST, ArtistSchema);
export default Artist;

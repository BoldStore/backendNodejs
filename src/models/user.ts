import { ObjectId, Schema, Document, model } from "mongoose";
import { ARTIST, BUSINESS, FILE, PAYMENT_DETAILS, USER } from "../models";

export interface UserType extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  loginType: string;
  identity: string;
  birthday: Date;
  artist: ObjectId;
  business: ObjectId;
  paymentDetails: ObjectId;
  password: number;
  image: ObjectId;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    loginType: {
      type: String,
      required: true,
    },
    identity: {
      type: String,
      required: true,
      enum: ["man", "woman", "other"],
    },
    birthday: {
      type: Date,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: ARTIST,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: BUSINESS,
    },
    paymentDetails: {
      type: Schema.Types.ObjectId,
      ref: PAYMENT_DETAILS,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: FILE,
    },
  },
  { timestamps: true }
);

const User = model<UserType>(USER, UserSchema);
export default User;

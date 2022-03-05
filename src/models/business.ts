import mongoose, { ObjectId, Schema } from "mongoose";
import { BUSINESS, FILE, USER } from "../models";

export interface BusinessType extends mongoose.Document {
  user: ObjectId;
}

const BusinessSchema = new Schema(
  {
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

const Business = mongoose.model<BusinessType>(BUSINESS, BusinessSchema);
export default Business;

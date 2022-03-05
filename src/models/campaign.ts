import { Schema, Document, model, ObjectId } from "mongoose";
import { EVENT, USER, FILE, CAMPAIGN } from "../models";

export interface CampaignType extends Document {
  event: ObjectId;
  createdBy: ObjectId;
  message: string;
  title: string;
  image: ObjectId;
  description: string;
}

const CampaignSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: EVENT,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: FILE,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Campaign = model<CampaignType>(CAMPAIGN, CampaignSchema);
export default Campaign;

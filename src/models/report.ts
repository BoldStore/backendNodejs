import { Schema, Document, model, ObjectId } from "mongoose";
import { USER, EVENT, REPORT } from "../models";

export interface ReportType extends Document {
  user: ObjectId;
  event: ObjectId;
  reportedBy: ObjectId;
  reason: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: EVENT,
    },
    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: USER,
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Report = model<ReportType>(REPORT, ReportSchema);
export default Report;

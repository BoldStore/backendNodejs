import { Schema, Document, model, ObjectId } from "mongoose";
import { USER, FEEDBACK } from "../models";

export interface FeedbackType extends Document {
  user: ObjectId;
  feedback: string;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Feedback = model<FeedbackType>(FEEDBACK, FeedbackSchema);
export default Feedback;

import { Schema, Document, model, ObjectId } from "mongoose";
import { USER, EVENT, REVIEW } from "../models";

export interface ReviewType extends Document {
  user: ObjectId;
  review: string;
  stars: number;
  event: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
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

const Review = model<ReviewType>(REVIEW, ReviewSchema);
export default Review;

import { Schema, Document, model } from "mongoose";
import { EVENT_CATEGORY } from "../models";

export interface EventCategoryType extends Document {
  category: string;
  description: string;
}

const EventCategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const EventCategory = model<EventCategoryType>(
  EVENT_CATEGORY,
  EventCategorySchema
);
export default EventCategory;

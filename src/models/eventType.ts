import { Schema, Document, model } from "mongoose";
import { EVENT_TYPE } from "../models";

export interface EventTypeType extends Document {
  type: string;
  description: string;
}

const EventTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const EventType = model<EventTypeType>(EVENT_TYPE, EventTypeSchema);
export default EventType;

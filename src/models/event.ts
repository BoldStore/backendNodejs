import mongoose, { ObjectId, Schema } from "mongoose";
import {
  LOCATION,
  EVENT_TYPE,
  FILE,
  USER,
  EVENT_CATEGORY,
  EVENT,
} from "../models";

export interface EventType extends mongoose.Document {
  title: string;
  location: ObjectId;
  type: ObjectId;
  photos: [ObjectId];
  videos: [ObjectId];
  cover: ObjectId;
  listedBy: ObjectId;
  amount: number;
  totalTickets: number;
  ticketsSold: number;
  views: number;
  language: string;
  date: Date;
  category: ObjectId;
  lastDate: Date;
  isDraft: boolean;
  description: string;
  smallDescripton: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: LOCATION,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: EVENT_TYPE,
    },
    photos: [
      {
        type: Schema.Types.ObjectId,
        ref: FILE,
      },
    ],
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: FILE,
      },
    ],
    cover: {
      type: Schema.Types.ObjectId,
      ref: FILE,
    },
    listedBy: {
      type: Schema.Types.ObjectId,
      ref: USER,
    },
    amount: {
      type: Number,
      required: true,
    },
    totalTickets: {
      type: Number,
      required: true,
    },
    ticketsSold: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: EVENT_CATEGORY,
    },
    lastDate: {
      type: Date,
      required: true,
    },
    isDraft: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    smallDescripton: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Event = mongoose.model<EventType>(EVENT, EventSchema);
export default Event;

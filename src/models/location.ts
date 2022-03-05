import { Schema, Document, model, ObjectId } from "mongoose";
import { USER, LOCATION } from "../models";

interface GeoType extends Document {
  type: string;
  coordinates: [number];
}

export interface LocationType extends Document {
  address: string;
  addressL1: string;
  addressL2: string;
  city: string;
  state: string;
  pincode: number;
  country: string;
  verified: boolean;
  addedBy: ObjectId;
  location: GeoType;
  createdAt: Date;
  updatedAt: Date;
}

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number], //the type is an array of numbers
    index: "2dsphere",
  },
});

const LocationSchema = new Schema(
  {
    address: {
      type: String,
    },
    addressL1: {
      type: String,
    },
    addressL2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    country: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    location: {
      type: GeoSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const Location = model<LocationType>(LOCATION, LocationSchema);
export default Location;

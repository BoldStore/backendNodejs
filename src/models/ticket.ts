import { Schema, Document, model, ObjectId } from "mongoose";
import { USER, EVENT, PAYMENT, CODE, TICKET } from "../models";

export interface TicketType extends Document {
  user: ObjectId;
  payment: ObjectId;
  event: ObjectId;
  amount: number;
  code: ObjectId;
  usedOn: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: EVENT,
      required: true,
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: PAYMENT,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    code: {
      type: Schema.Types.ObjectId,
      ref: CODE,
    },
    usedOn: {
      type: Date,
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

const Ticket = model<TicketType>(TICKET, TicketSchema);
export default Ticket;

import { Schema, Document, model, ObjectId } from "mongoose";
import { USER, TICKET, PAYMENT } from "../models";

export interface PaymentType extends Document {
  user: ObjectId;
  ticket: ObjectId;
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: TICKET,
    },
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = model<PaymentType>(PAYMENT, PaymentSchema);
export default Payment;

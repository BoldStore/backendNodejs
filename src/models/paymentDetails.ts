import mongoose, { ObjectId, Schema } from "mongoose";
import { PAYMENT_DETAILS, FILE, USER } from "../models";

export interface PaymentDetailsType extends mongoose.Document {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}

const PaymentDetailsSchema = new Schema(
  {
    accountHolderName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentDetails = mongoose.model<PaymentDetailsType>(
  PAYMENT_DETAILS,
  PaymentDetailsSchema
);
export default PaymentDetails;

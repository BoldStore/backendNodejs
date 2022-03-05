import { Schema, Document, model, ObjectId } from "mongoose";
import { CODE_ACTION, CODE_TYPE, CODE } from "../models";

export interface CodeType extends Document {
  code: string;
  max: string;
  usedBy: string;
  type: ObjectId;
  action: ObjectId;
  text: string;
}

const CodeSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    max: {
      type: String,
    },
    usedBy: {
      type: String,
      required: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: CODE_TYPE,
    },
    action: {
      type: Schema.Types.ObjectId,
      ref: CODE_ACTION,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Code = model<CodeType>(CODE, CodeSchema);
export default Code;

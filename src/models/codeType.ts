import { Schema, Document, model } from "mongoose";
import { CODE_TYPE } from "../models";

export interface CodeTypeType extends Document {
  type: string;
  description: string;
}

const CodeTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const CodeType = model<CodeTypeType>(CODE_TYPE, CodeTypeSchema);
export default CodeType;

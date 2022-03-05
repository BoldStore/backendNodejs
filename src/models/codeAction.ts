import { Schema, Document, model } from "mongoose";
import { CODE_ACTION } from "../models";

export interface CodeActionType extends Document {
  action: string;
  description: string;
}

const CodeActionSchema = new Schema({
  action: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const CodeAction = model<CodeActionType>(CODE_ACTION, CodeActionSchema);
export default CodeAction;

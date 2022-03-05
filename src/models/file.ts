import { Schema, Document, model } from "mongoose";
import { FILE } from "../models";

export interface FileType extends Document {
  url: string;
  fileName: string;
  type: string;
}

const FileSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const File = model<FileType>(FILE, FileSchema);
export default File;

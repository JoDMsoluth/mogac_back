import * as mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import TagsDocument from "./TagsDocument";

export const TagsSchema: Schema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const TagsCollection: Model<TagsDocument> = mongoose.model("Tags", TagsSchema);

export default TagsCollection;

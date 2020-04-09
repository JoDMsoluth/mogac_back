import * as mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import CategoryDocument from "./CategoryDocument";

export const CategorySchema: Schema = new Schema(
  {
    name: String,
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
  },
  { timestamps: true }
);

const CategoryCollection: Model<CategoryDocument> = mongoose.model(
  "Category",
  CategorySchema
);

export default CategoryCollection;

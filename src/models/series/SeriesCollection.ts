import * as mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import SeriesDocument from "./SeriesDocument";

export const SeriesSchema: Schema = new Schema(
  {
    title: String,
    description: String,
    contents: String,
    views: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    posts: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const SeriesCollection: Model<SeriesDocument> = mongoose.model(
  "Series",
  SeriesSchema
);

export default SeriesCollection;

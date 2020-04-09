import * as mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import PostsDocument from "./PostsDocument";

export const PostsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    contents: { type: String, required: true },
    views: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    image_url: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Images",
        required: true,
        trim: true,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    followUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags",
      },
    ],
  },
  { timestamps: true }
);

const PostsCollection: Model<PostsDocument> = mongoose.model(
  "Posts",
  PostsSchema
);

export default PostsCollection;

import * as mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import UsersDocument from "./UsersDocument";

export const UsersSchema: Schema = new Schema(
  {
    email: { type: String, lowercase: true },
    password: String,
    name: String,
    phone: String,
    address: String,
    birth: String,
    image_url: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Images",
      trim: true,
    },
    point: Number,
    level: Number,
    check_found: Boolean,
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position",
    },
    favorites: [String],
    blackListId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    likeUsersId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams",
      },
    ],
    isAdmin: Boolean,
    authPayloads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
      },
    ],
  },
  { timestamps: true }
);

const UsersCollection: Model<UsersDocument> = mongoose.model(
  "Users",
  UsersSchema
);

export default UsersCollection;

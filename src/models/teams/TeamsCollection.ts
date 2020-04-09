import * as mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import TeamsDocument from "./TeamsDocument";

export const TeamsSchema: Schema = new Schema(
  {
    title: String,
    description: String,
    adminId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    category: String,
  },
  { timestamps: true }
);

const TeamsCollection: Model<TeamsDocument> = mongoose.model(
  "Teams",
  TeamsSchema
);

export default TeamsCollection;

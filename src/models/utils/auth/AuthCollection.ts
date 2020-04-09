import * as mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import AuthDocument from "./AuthDocument";

export const AuthSchema: Schema = new Schema(
  {
    token: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const AuthCollection: Model<AuthDocument> = mongoose.model("Auth", AuthSchema);

export default AuthCollection;

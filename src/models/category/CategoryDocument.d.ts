import { Document } from "mongoose";
import { UnifiedModel } from "../../types/ts/modelTypes";

export default interface CommentsDocument extends Document, UnifiedModel {
  _id: any;
  name: String;
  posts: any[];
}

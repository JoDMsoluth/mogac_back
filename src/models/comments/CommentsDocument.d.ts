import { Document } from "mongoose";
import { UnifiedModel } from "../../types/ts/modelTypes";

export default interface CommentsDocument extends Document, UnifiedModel {
  parentPost: any;
  parentComment: any;
  commentBy: any;
  likeUser: any[];
  recomments: any[];
}

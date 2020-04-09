import { Document } from "mongoose";
import { PostModel, UnifiedModel } from "../../types/ts/modelTypes";

export default interface PostsDocument
  extends Document,
    PostModel,
    UnifiedModel {
  image_url: string[];
  comments: any[];
  followUser: any[];
  series: any;
  tags: any[];
}

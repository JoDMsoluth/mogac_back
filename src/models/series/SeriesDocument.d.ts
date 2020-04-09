import { Document } from "mongoose";
import { PostModel, UnifiedModel } from "../../types/ts/modelTypes";

export default interface SeriesDocument
  extends Document,
    PostModel,
    UnifiedModel {
  images_url: any[];
  posts: any[];
}

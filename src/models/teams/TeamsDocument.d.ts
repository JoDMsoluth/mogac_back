import { Document } from "mongoose";
import { UnifiedModel } from "../../types/ts/modelTypes";

export default interface PostsDocument extends Document, UnifiedModel {
  title: string;
  description: string;
  cover_img: any;
  adminId: any;
  users: any[];
  category: string;
}

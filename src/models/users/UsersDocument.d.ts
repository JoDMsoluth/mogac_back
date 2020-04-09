import { Document } from "mongoose";
import { UnifiedModel } from "../../types/ts/modelTypes";

export default interface PostsDocument extends Document, UnifiedModel {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  birth: string;
  image_url: any;
  point: number;
  level: number;
  check_found: boolean;
  position: any;
  favorites: String[];
  blackListId: any[];
  posts: any[];
  likePostsId: any[];
  teams: any[];
  isAdmin: boolean;
  authPayloads: any;
}

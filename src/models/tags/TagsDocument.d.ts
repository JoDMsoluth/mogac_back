import { Document } from "mongoose";

export default interface PostsDocument extends Document {
  id: any;
  name: string;
}

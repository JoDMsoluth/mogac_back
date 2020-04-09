import { Document } from "mongoose";

export default interface ImagesDocument extends Document {
  id: any;
  image_url: String;
  category: String;
}

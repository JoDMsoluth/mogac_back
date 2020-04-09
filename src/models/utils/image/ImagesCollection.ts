import * as mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import ImagesDocument from "./ImagesDocument";

export const ImagesSchema: Schema = new Schema({
  image_url: { type: String, trim: true },
  category: String,
});

const ImagesCollection: Model<ImagesDocument> = mongoose.model(
  "Images",
  ImagesSchema
);

export default ImagesCollection;

import * as mongoose from "mongoose";
import { Model, Schema } from "mongoose";
import PositionDocument from "./PositionDocument";

export const PositionSchema: Schema = new Schema({
  x_pos: Number,
  y_pos: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const PositionCollection: Model<PositionDocument> = mongoose.model(
  "Position",
  PositionSchema
);

export default PositionCollection;

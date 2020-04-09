import { Document } from "mongoose";

export default interface PositionDocument extends Document {
  _id: any;
  x_pos: number;
  y_pos: number;
  user: any;
}

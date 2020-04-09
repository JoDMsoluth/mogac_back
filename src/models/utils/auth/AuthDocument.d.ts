import { Document } from "mongoose";
import { UnifiedModel } from "../../../types/ts/modelTypes";

export default interface AuthDocument extends Document, UnifiedModel {
  token: string;
  userd: any;
}

import * as Vts from "vee-type-safe";
import { Stream } from "stream";
export { Maybe } from "vee-type-safe";

export interface ClassType<TInstance = any, TArgs extends any[] = any[]>
  extends Function {
  new (...args: TArgs): TInstance;
}

export interface Upload {
  filename: string;
  mimetype?: string;
  encoding?: string;
  createReadStream: () => Stream;
}

export interface UploadResponse {
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
}

export type ClassPrototype<
  TClass extends ClassType = ClassType
> = TClass["prototype"];

export namespace JWT {
  export interface Payload {
    sub: string; // user id
  }
  export const PayloadTD: Vts.TypeDescrObject<{ sub: string }> = {
    sub: Vts.isBsonObjectIdString,
  };
}

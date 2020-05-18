import { ObjectType, Field } from "type-graphql";
import { ReadStream } from "fs";

@ObjectType()
export class UploadResponseType {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field()
  url: string;
}

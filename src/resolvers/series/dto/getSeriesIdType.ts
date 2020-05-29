import { Field, ObjectType } from "type-graphql";
import * as I from "../../../lib/helper/interfaces";

@ObjectType()
export class GetSeriesIdType {
  @Field()
  _id: I.ObjectId;

  @Field()
  title: string;
}

import { MessageType } from "./../../../models/Message";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class getAllMessageResponseType {
  @Field()
  lastPage: string;

  @Field((_type) => [MessageType])
  docs: MessageType[];
}

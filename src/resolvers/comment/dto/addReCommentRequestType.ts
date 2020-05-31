import { Field, ObjectType, InputType } from "type-graphql";

import { PostType } from "../../../models/Posts";

@InputType()
export class AddReCommentRequestType {
  @Field()
  contents: string;

  @Field()
  parentComment: string;

  @Field((_type) => Boolean)
  secret: boolean;
}

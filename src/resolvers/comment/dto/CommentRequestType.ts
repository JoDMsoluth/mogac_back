import { Field, ObjectType, InputType } from "type-graphql";

import { PostType } from "../../../models/Posts";

@InputType()
export class AddCommentRequestType {
  @Field()
  contents: string;

  @Field()
  parentPost: string;

  @Field((_type) => Boolean)
  secret: boolean;
}

@InputType()
export class UpdateCommentRequestType {
  @Field()
  commentId: string;

  @Field()
  contents: string;

  @Field((_type) => Boolean)
  secret: boolean;
}

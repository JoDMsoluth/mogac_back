import { Field, ObjectType } from "type-graphql";

import { PostType } from "../../../models/Posts";

@ObjectType()
export class GetAllPostResponseType {
  @Field()
  lastPage: string;

  @Field((_type) => [PostType])
  posts: PostType[];
}

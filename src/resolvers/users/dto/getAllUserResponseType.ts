import { Field, ObjectType } from "type-graphql";

import { UserType } from "../../../models/Users";

@ObjectType()
export class GetAllUserResponseType {
  @Field()
  lastPage: string;

  @Field((_type) => [UserType])
  users: UserType[];
}

import { Field, ObjectType } from "type-graphql";

import { UserType } from "../../models/Users";

@ObjectType()
export class LoginResponseType {
  @Field()
  jwt!: string;

  @Field()
  user!: UserType;
}

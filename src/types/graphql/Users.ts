import { ObjectType, Field, Int, ID } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true }) // // 기본 필드가 String으로 선언되기에 () => String은 생략 가능
  email: string;
}

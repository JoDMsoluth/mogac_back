import { Field, InputType } from "type-graphql";
import { IsInt } from "class-validator";

@InputType()
export class PaginateArgType {
  @Field()
  @IsInt()
  page: number;

  @Field()
  @IsInt()
  limit: number;
}

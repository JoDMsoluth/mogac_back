import { RecommendType } from "../../../models/Recommend";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class GetAllRecommendResponseType {
  @Field()
  lastPage: string;


  @Field((_type) => [RecommendType])
  docs: RecommendType[];
}

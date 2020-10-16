import { Field, InputType, Int } from "type-graphql";
import { LengthRange } from "../../../lib/decorators/length-range";
import { RecommendPropLimits } from "../../../models/Recommend";

@InputType()
export class AddRecommendRequestType {
  @Field()
  skillName : string;

  @Field((_type) => Int)
  level : number;

  @Field()
  userId: string;

  @Field()
  @LengthRange(RecommendPropLimits.titleLength)
  title: string;

  @Field()
  @LengthRange(RecommendPropLimits.contentsLength)
  contents: string;
}

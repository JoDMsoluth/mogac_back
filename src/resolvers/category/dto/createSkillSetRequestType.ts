import { Field, InputType } from "type-graphql";

import { LengthRange } from "../../../lib/decorators/length-range";
import { SeriesPropLimits } from "../../../models/Series";
import { CategoryPropLimits } from "../../../models/Category";

@InputType()
export class createSkillSetRequestType {
  @Field()
  @LengthRange(CategoryPropLimits.NameLength)
  categoryName: string;

  @Field()
  skill: string;
}

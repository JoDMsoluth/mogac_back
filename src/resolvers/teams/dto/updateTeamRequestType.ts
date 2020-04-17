import { Field, InputType } from "type-graphql";

import { LengthRange } from "../../../lib/decorators/length-range";
import { TeamPropLimits } from "../../../models/Teams";

@InputType()
export class UpdateTeamRequestType {
  @Field({ nullable: true })
  @LengthRange(TeamPropLimits.TitleLength)
  title?: string;

  @Field({ nullable: true })
  @LengthRange(TeamPropLimits.DescriptionLength)
  description?: string;

  @Field({ nullable: true })
  @LengthRange(TeamPropLimits.CategoryLength)
  category?: string;
}

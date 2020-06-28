import { Field, InputType } from "type-graphql";

import { LengthRange } from "../../../lib/decorators/length-range";
import { TeamPropLimits } from "../../../models/Teams";

@InputType()
export class AddTeamRequestType {
  @Field()
  @LengthRange(TeamPropLimits.TitleLength)
  title: string;

  @Field()
  @LengthRange(TeamPropLimits.DescLength)
  desc: string;

  @Field()
  category: string;

  @Field()
  location: string;
}

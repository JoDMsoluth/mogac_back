import { Field, InputType } from "type-graphql";

import { LengthRange } from "../../lib/decorators/length-range";
import { SeriesPropLimits } from "../../models/Series";

@InputType()
export class AddSeriesRequestType {
  @Field({ nullable: true })
  @LengthRange(SeriesPropLimits.TitleLength)
  title?: string;

  @Field({ nullable: true })
  @LengthRange(SeriesPropLimits.DescriptionLength)
  description?: string;

  @Field({ nullable: true })
  @LengthRange(SeriesPropLimits.ContentsLength)
  contents?: string;
}

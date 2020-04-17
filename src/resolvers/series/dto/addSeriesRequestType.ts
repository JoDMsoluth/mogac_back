import { Field, InputType } from "type-graphql";

import { LengthRange } from "../../../lib/decorators/length-range";
import { SeriesPropLimits } from "../../../models/Series";

@InputType()
export class AddSeriesRequestType {
  @Field()
  @LengthRange(SeriesPropLimits.TitleLength)
  title: string;

  @Field()
  @LengthRange(SeriesPropLimits.DescriptionLength)
  description: string;

  @Field()
  @LengthRange(SeriesPropLimits.ContentsLength)
  contents: string;
}

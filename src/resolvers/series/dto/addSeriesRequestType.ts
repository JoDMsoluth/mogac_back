import { Field, InputType } from "type-graphql";

import { LengthRange } from "../../../lib/decorators/length-range";
import { SeriesPropLimits } from "../../../models/Series";
import * as I from "../../../lib/helper/interfaces";

@InputType()
export class AddSeriesRequestType {
  @Field()
  @LengthRange(SeriesPropLimits.TitleLength)
  title: string;

  @Field()
  @LengthRange(SeriesPropLimits.DescriptionLength)
  description?: string;
}

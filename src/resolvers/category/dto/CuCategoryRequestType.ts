import { Field, InputType } from "type-graphql";

import { LengthRange } from "../../../lib/decorators/length-range";
import { CategoryPropLimits } from "../../../models/Category";

@InputType()
export class CuCategoryRequestType {
  @Field()
  @LengthRange(CategoryPropLimits.NameLength)
  name: string;
}

import { Field, InputType, Int } from "type-graphql";

import { LengthRange } from "../../../lib/decorators/length-range";
import { SkillSetPropLimits } from "../../../models/SkillSet";

@InputType()
export class AddSkillSetRequestType {
  @Field()
  @LengthRange(SkillSetPropLimits.nameLength)
  name: string;

  @Field((_type) => Int)
  @LengthRange(SkillSetPropLimits.levelLength)
  level: number;
}

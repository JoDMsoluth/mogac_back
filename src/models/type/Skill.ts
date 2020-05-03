import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType, Int } from "type-graphql";
import { IntegerRange } from "../../lib/helper/integer-range";

export namespace SkillPropLimits {
  export const nameLength = new IntegerRange(1, 20);
  export const levelLength = new IntegerRange(1, 20);
}

export interface ISkill {
  skill: string;
  level: number;
}

@ObjectType("Skill")
export class SkillType extends Typegoose implements ISkill {
  @Field()
  @prop({ required: true, unique: true })
  skill!: string;

  @Field((_type) => Int)
  @prop({ required: true })
  level: number;
}

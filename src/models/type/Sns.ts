import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType, Int } from "type-graphql";
import { IntegerRange } from "../../lib/helper/integer-range";

export namespace SnsPropLimits {
  export const snsLength = new IntegerRange(1, 20);
  export const urlLength = new IntegerRange(1, 20);
}

export interface ISns {
  sns: string;
  url: string;
}

@ObjectType("Sns")
export class SnsType extends Typegoose implements ISns {
  @Field()
  @prop({ required: true, unique: true })
  sns!: string;

  @Field()
  @prop({ required: true })
  url: string;
}

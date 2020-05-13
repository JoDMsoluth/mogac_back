import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType, Int } from "type-graphql";
import { BaseRepo } from "../repositorys/BaseRepo";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { PostType } from "./Posts";

export namespace SkillSetPropLimits {
  export const nameLength = new IntegerRange(1, 20);
  export const levelLength = new IntegerRange(1, 20);
}

export interface ISkillSet {
  skill: string;
  posts?: any;
  level: number;
}

@ObjectType("SkillSet")
export class SkillSetType extends Typegoose implements ISkillSet {
  @Field()
  @prop()
  get id(this: SkillSet): I.ObjectId {
    return this._id;
  }

  @Field()
  @prop({ required: true, unique: true })
  skill!: string;

  @Field((_type) => PostType)
  @arrayProp({ itemsRef: "PostType" })
  posts: Ref<PostType>[];

  @Field((_type) => Int)
  @prop({ required: true })
  level: number;
}

export const SkillSet = Utils.getModelFromTypegoose(SkillSetType);

export type SkillSet = InstanceType<SkillSetModel>;
export type SkillSetModel = typeof SkillSet;
export type SkillSetData = I.TypegooseDocProps<SkillSetType>;

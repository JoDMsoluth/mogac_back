import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType, Int } from "type-graphql";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { PostType } from "./Posts";
import { SkillSetType } from "./SkillSet";

export namespace CategoryPropLimits {
  export const NameLength = new IntegerRange(1, 20);
}

export interface ICategory {
  name: string;
}

@ObjectType("Category")
export class CategoryType extends Typegoose implements ICategory {
  @Field()
  @prop()
  get id(this: Category): I.ObjectId {
    return this._id;
  }

  @Field((_type) => Date)
  @prop({ required: true, default: Date.now })
  createdAt!: Date;

  @Field((_type) => Date)
  @prop({ required: true, default: Date.now })
  updatedAt!: Date;

  @Field()
  @prop({ required: true, unique: true })
  name!: string;

  @Field((_type) => [SkillSetType])
  @arrayProp({ itemsRef: "SkillSetType" })
  skillset: Ref<SkillSetType>[];

  @Field((_type) => Int)
  @prop()
  points: number;
}

export const Category = Utils.getModelFromTypegoose(CategoryType);

export const CategoryPaginator = new Paginator<CategoryData, Category>({
  model: Category,
});

export type Category = InstanceType<CategoryModel>;
export type CategoryModel = typeof Category;
export type CategoryData = I.TypegooseDocProps<CategoryType>;

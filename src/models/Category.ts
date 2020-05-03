import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { PostType } from "./Posts";
import { ISkill, SkillType } from "./type/Skill";

export namespace CategoryPropLimits {
  export const NameLength = new IntegerRange(1, 20);
}

export interface ICategory {
  name: string;
  posts: any[];
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

  @Field((_type) => PostType)
  @arrayProp({ itemsRef: "PostType" })
  posts: Ref<PostType>[];

  @Field((_type) => [SkillType])
  @prop({ default: [] })
  skillset: ISkill[];
}

export const Category = Utils.getModelFromTypegoose(CategoryType);

export const CategoryPaginator = new Paginator<CategoryData, Category>({
  model: Category,
});

export type Category = InstanceType<CategoryModel>;
export type CategoryModel = typeof Category;
export type CategoryData = I.TypegooseDocProps<CategoryType>;

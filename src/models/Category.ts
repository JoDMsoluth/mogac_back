import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, pre, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { TryCrud } from "../lib/mongoose-utils/try-crud";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { PostType } from "./Posts";

export namespace CategoryPropLimits {
  export const TitleLength = new IntegerRange(6, 70);
  export const DescriptionLength = new IntegerRange(3, 2000);
  export const ContentsLength = new IntegerRange(3, 10000);
}

export interface ICategory {
  name: string;
  posts: any[];
}

@pre<CategoryType>("save", function (next: CallableFunction) {
  if (!this.isModified("contents") || !this.isModified("title")) {
    return next();
  }
  this.updatedAt = (Date.now() as unknown) as Date;
  next();
})
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
  @prop({ required: true })
  name!: string;

  @Field((_type) => PostType)
  @arrayProp({ itemsRef: PostType })
  posts: Ref<PostType>[];
}

export const Category = Utils.getModelFromTypegoose(CategoryType);

export const CategoryTryCrud = new TryCrud(Category);
export const CategoryPaginator = new Paginator<CategoryData, Category>({
  model: Category,
});

export type Category = InstanceType<CategoryModel>;
export type CategoryModel = typeof Category;
export type CategoryData = I.TypegooseDocProps<CategoryType>;

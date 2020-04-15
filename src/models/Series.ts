import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { TryCrud } from "../lib/mongoose-utils/BaseRepo";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { PostType } from "./Posts";

export namespace SeriesPropLimits {
  export const TitleLength = new IntegerRange(6, 70);
  export const DescriptionLength = new IntegerRange(3, 2000);
  export const ContentsLength = new IntegerRange(3, 10000);
}

export interface ISeries {
  title: string;
  description: string;
  contents: string;
  posts: any[];
}

@ObjectType("Series")
export class SeriesType extends Typegoose implements ISeries {
  @Field()
  @prop()
  get id(this: Series): I.ObjectId {
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
  title!: string;

  @Field()
  @prop({ required: true })
  description!: string;

  @Field()
  @prop({ required: true })
  contents!: string;

  @Field((_type) => [String])
  @arrayProp({ itemsRef: PostType })
  posts: Ref<PostType>[];
}

export const Series = Utils.getModelFromTypegoose(SeriesType);

export const SeriesTryCrud = new TryCrud(Series);
export const SeriesPaginator = new Paginator<SeriesData, Series>({
  model: Series,
});

export type Series = InstanceType<SeriesModel>;
export type SeriesModel = typeof Series;
export type SeriesData = I.TypegooseDocProps<SeriesType>;

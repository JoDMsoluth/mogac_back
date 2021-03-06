import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { PostType } from "./Posts";
import { UserType } from "./Users";

export namespace SeriesPropLimits {
  export const TitleLength = new IntegerRange(1, 50);
  export const DescriptionLength = new IntegerRange(0, 500);
}

export interface ISeries {
  title: string;
  description?: string;
  posts: any[];
}

@ObjectType("Series")
export class SeriesType extends Typegoose implements ISeries {
  @Field()
  _id: I.ObjectId;
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
  @prop({ default: "" })
  description?: string;

  @Field((_type) => [PostType])
  @arrayProp({ itemsRef: "PostType" })
  posts: Ref<PostType>[];

  @Field((_type) => UserType)
  @prop({ ref: "UserType" })
  seriesBy: Ref<UserType>;
}

export const Series = Utils.getModelFromTypegoose(SeriesType);

export const SeriesPaginator = new Paginator<SeriesData, Series>({
  model: Series,
});

export type Series = InstanceType<SeriesModel>;
export type SeriesModel = typeof Series;
export type SeriesData = I.TypegooseDocProps<SeriesType>;

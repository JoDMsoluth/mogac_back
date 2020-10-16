import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, Ref } from "@hasezoey/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { BaseRepo } from "../repositorys/BaseRepo";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { UserType } from "./Users";

export namespace RecommendPropLimits {
  export const titleLength = new IntegerRange(1, 50);
  export const contentsLength = new IntegerRange(1, 255);
}

export interface IRecommend {
  userId: any;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  contents: string;
  skillName : string;
  level : number;
}

@ObjectType("Recommend")
export class RecommendType extends Typegoose implements IRecommend {
  @Field()
  _id: string;

  @Field()
  @prop()
  get id(this: Recommend): I.ObjectId {
    return this._id;
  }

  @Field()
  @prop({ required: true })
  userId: string;

  @Field((_type) => Date)
  @prop({ default: Date.now })
  createdAt: Date;

  @Field((_type) => Date)
  @prop({ default: Date.now })
  updatedAt: Date;

  @Field((_type) => UserType)
  @prop({ ref: "UserType" })
  recommendedBy?: Ref<UserType>;

  @Field()
  @prop({ required: true })
  skillName: string;

  @Field((_type) => Int)
  @prop({ required: true })
  level: number;

  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ required: true })
  contents: string;
}

export const Recommend = Utils.getModelFromTypegoose(RecommendType);

export const RecommendTryCrud = new BaseRepo(Recommend);
export const RecommendPaginator = new Paginator<RecommendData, Recommend>({
  model: Recommend,
});

export type Recommend = InstanceType<RecommendModel>;
export type RecommendModel = typeof Recommend;
export type RecommendData = I.TypegooseDocProps<RecommendType>;

import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { UserType } from "./Users";

export namespace TeamPropLimits {
  export const TitleLength = new IntegerRange(6, 70);
  export const DescriptionLength = new IntegerRange(3, 2000);
  export const CategoryLength = new IntegerRange(3, 10000);
}

export interface ITeam {
  title: string;
  description: string;
  adminId?: any;
  users: any[];
  category?: string;
}

@ObjectType("Team")
export class TeamType extends Typegoose implements ITeam {
  @Field()
  @prop()
  get id(this: Team): I.ObjectId {
    return this._id;
  }

  @Field((_type) => Date)
  @prop({ default: Date.now })
  createdAt: Date;

  @Field((_type) => Date)
  @prop({ default: Date.now })
  updatedAt: Date;

  // @Field()
  // @prop({ required : true, default: false })
  // disabled!: boolean;

  @Field()
  @prop({ required: true })
  title!: string;

  @Field()
  @prop({ required: true })
  description!: string;

  @Field((_type) => String)
  @prop({ ref: "UserType" })
  adminId?: Ref<UserType>;

  @Field(() => [String])
  @arrayProp({ itemsRef: "UserType" })
  users: Ref<UserType>[];

  @Field()
  @prop({ required: true })
  category!: string;
}

export const Team = Utils.getModelFromTypegoose(TeamType);
export const TeamPaginator = new Paginator<TeamData, Team>({
  model: Team,
});

export type Team = InstanceType<TeamModel>;
export type TeamModel = typeof Team;
export type TeamData = I.TypegooseDocProps<TeamType>;

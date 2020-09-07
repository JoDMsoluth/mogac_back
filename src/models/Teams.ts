import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { UserType } from "./Users";

export namespace TeamPropLimits {
  export const TitleLength = new IntegerRange(1, 50);
  export const DescLength = new IntegerRange(1, 200);
}

export interface ITeam {
  title: string;
  desc: string;
  adminId?: any;
  users: any[];
  category?: string;
}

@ObjectType("Team")
export class TeamType extends Typegoose implements ITeam {
  @Field()
  _id: I.ObjectId;

  @Field((_type) => Date)
  @prop({ default: Date.now })
  createdAt: Date;

  @Field((_type) => Date)
  @prop({ default: Date.now })
  updatedAt: Date;

  @Field()
  @prop({ required: true })
  title!: string;

  @Field()
  @prop({ required: true })
  desc!: string;

  @Field()
  @prop({ required: true })
  adminId!: string;

  @Field(() => [String])
  @arrayProp({ items: String })
  users: string[];

  @Field()
  @prop({ required: true })
  category!: string;

  @Field()
  @prop({ required: true })
  location!: string;

  @Field()
  @prop({ required: false, default: "" })
  notice?: string;

  @Field(() => [String])
  @arrayProp({ items: String })
  blackList?: string[];

  @Field(() => [String])
  @arrayProp({ items: String })
  chatData?: string[];
}

export const Team = Utils.getModelFromTypegoose(TeamType);
export const TeamPaginator = new Paginator<TeamData, Team>({
  model: Team,
});

export type Team = InstanceType<TeamModel>;
export type TeamModel = typeof Team;
export type TeamData = I.TypegooseDocProps<TeamType>;

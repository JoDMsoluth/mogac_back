import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import "reflect-metadata";
import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType, Int } from "type-graphql";
import { BaseRepo } from "../repositorys/BaseRepo";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { UserType } from "./Users";
import { PostType } from "./Posts";

export namespace CommentPropLimits {
  export const TitleLength = new IntegerRange(6, 70);
  export const DescriptionLength = new IntegerRange(3, 2000);
  export const ContentsLength = new IntegerRange(3, 10000);
}

export interface IComment {
  contents: string;
  parentPost?: any;
  parentComment?: any;
  commentBy: any;
  likeUser?: any[];
  secret: boolean;
}

@ObjectType("Comment")
export class CommentType extends Typegoose implements IComment {
  @Field()
  _id: string;

  @Field()
  @prop()
  get id(this: Comment): I.ObjectId {
    return this._id;
  }

  @Field((_type) => Date)
  @prop({ required: true, default: Date.now })
  createdAt!: Date;

  @Field((_type) => Date)
  @prop({ required: true, default: Date.now })
  updatedAt!: Date;

  // @Field()
  // @prop({ required : true, default: false })
  // disabled!: boolean;

  @Field() // must be explicitly forwarded when using enums
  @prop({ required: true })
  contents!: string;

  @Field()
  @prop()
  parentComment?: string;

  @Field(() => PostType)
  @prop({ ref: "PostType" })
  parentPost?: Ref<PostType>;

  @Field(() => Int)
  @prop({ default: 0 })
  reComments: number;

  @Field((_type) => UserType)
  @prop({ ref: "UserType" })
  commentBy: Ref<UserType>;

  @Field((_type) => Boolean)
  @prop({ default: false })
  secret: boolean;
}

export const Comment = Utils.getModelFromTypegoose(CommentType);

export const CommentTryCrud = new BaseRepo(Comment);
export const CommentPaginator = new Paginator<CommentData, Comment>({
  model: Comment,
});

export type Comment = InstanceType<CommentModel>;
export type CommentModel = typeof Comment;
export type CommentData = I.TypegooseDocProps<CommentType>;

import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import "reflect-metadata";
import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { TryCrud } from "../lib/mongoose-utils/try-crud";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { UserType } from "./Users";

export namespace CommentPropLimits {
  export const TitleLength = new IntegerRange(6, 70);
  export const DescriptionLength = new IntegerRange(3, 2000);
  export const ContentsLength = new IntegerRange(3, 10000);
}

export interface IComment {
  contents: string;
  parentPost: any;
  parentComment?: any;
  commentBy: any;
  likeUser?: any[];
}

@ObjectType("Comment")
export class CommentType extends Typegoose implements IComment {
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

  @Field((_type) => String)
  @prop({ ref: "UserType" })
  parentPost: Ref<UserType>;

  @Field(() => String)
  @prop({ ref: "CommentType" })
  parentComment?: Ref<CommentType>;

  @Field((_type) => String)
  @prop({ ref: "UserType" })
  commentBy: Ref<UserType>;
}

export const Comment = Utils.getModelFromTypegoose(CommentType);

export const CommentTryCrud = new TryCrud(Comment);
export const CommentPaginator = new Paginator<CommentData, Comment>({
  model: Comment,
});

export type Comment = InstanceType<CommentModel>;
export type CommentModel = typeof Comment;
export type CommentData = I.TypegooseDocProps<CommentType>;

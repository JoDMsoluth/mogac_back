import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, arrayProp, Ref, pre } from "@hasezoey/typegoose";
import { Field, ObjectType, Int } from "type-graphql";
import { BaseRepo } from "../repositorys/BaseRepo";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { TCategory } from "../types/ts/modelTypes";
import { UserType, User } from "./Users";
import { CommentType } from "./Comments";
import { SeriesType } from "./Series";

export namespace PostPropLimits {
  export const TitleLength = new IntegerRange(1, 50);
  export const DescLength = new IntegerRange(0, 500);
  export const ContentsLength = new IntegerRange(1, 20000);
  export const TagsLength = new IntegerRange(0, 30);
}

export interface IPost {
  title: string;
  desc: string;
  contents: string;
}

@ObjectType("Post")
export class PostType extends Typegoose implements IPost {
  @Field()
  _id: string;

  @Field((_type) => Date)
  @prop({ required: true, default: Date.now })
  createdAt!: Date;

  @Field((_type) => Date)
  @prop({ required: true, default: Date.now })
  updatedAt!: Date;

  // @Field()
  // @prop({ required : true, default: false })
  // disabled!: boolean;
  @Field((_type) => Int) // must be explicitly forwarded when using enums
  @prop({ required: true, default: 0 })
  like!: number;

  @Field() // must be explicitly forwarded when using enums
  @prop({ required: true })
  title!: string;

  @Field()
  @prop({ required: true })
  desc!: string; // do not expose password as public GraphQL field

  @Field()
  @prop({ required: true })
  contents!: string;

  @Field()
  @prop({ default: "" })
  cover_Img?: string;

  @Field(() => [String])
  @arrayProp({ items: String })
  image_url?: string[];

  @Field(() => Int)
  @prop({ required: true, default: 0 })
  views?: number;

  @Field()
  @prop({ required: true })
  category!: string;

  @Field((_type) => [CommentType])
  @arrayProp({ itemsRef: "CommentType" })
  comments?: Ref<CommentType>[];

  @Field((_type) => [UserType])
  @arrayProp({ itemsRef: "UserType" })
  followUser?: Ref<UserType>[];

  @Field((_type) => SeriesType)
  @prop({ ref: "SeriesType" })
  series?: Ref<SeriesType>;

  @Field((_type) => UserType)
  @prop({ ref: "UserType" })
  postedBy?: Ref<UserType>;

  @Field((_type) => [String])
  @arrayProp({ items: String, default: [] })
  tags?: string[];
}

export const Post = Utils.getModelFromTypegoose(PostType);

export const PostTryCrud = new BaseRepo(Post);
export const PostPaginator = new Paginator<PostData, Post>({ model: Post });

export type Post = InstanceType<PostModel>;
export type PostModel = typeof Post;
export type PostData = I.TypegooseDocProps<PostType>;

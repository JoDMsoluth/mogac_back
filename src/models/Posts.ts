import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType, Int } from "type-graphql";
import { TryCrud } from "../lib/mongoose-utils/try-crud";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { TCategory } from "../types/ts/modelTypes";
import { UserType } from "./Users";
import { CommentType } from "./Comments";
import { SeriesType } from "./Series";
import { TagType } from "./Tag";

export namespace PostPropLimits {
  export const TitleLength = new IntegerRange(6, 70);
  export const DescriptionLength = new IntegerRange(3, 2000);
  export const ContentsLength = new IntegerRange(3, 10000);
}

export interface IPost {
  title: string;
  description: string;
  contents: string;
}

@ObjectType("Post")
export class PostType extends Typegoose implements IPost {
  @Field()
  @prop()
  get id(this: Post): I.ObjectId {
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
  title!: string;

  @Field()
  @prop({ required: true })
  description!: string; // do not expose password as public GraphQL field

  @Field()
  @prop({ required: true })
  contents!: string;

  @Field()
  @prop()
  cover_Img?: string;

  @Field(() => [String])
  @arrayProp({ items: String })
  image_url?: string[];

  @Field(() => Int)
  @prop({ required: true, default: 0 })
  views?: number;

  @Field()
  @prop({ required: true })
  category!: TCategory;

  @Field((_type) => [String])
  @arrayProp({ itemsRef: "CommentType" })
  comments?: Ref<CommentType>[];

  @Field((_type) => [String])
  @arrayProp({ itemsRef: "UserType" })
  followUser?: Ref<UserType>[];

  @Field((_type) => String)
  @prop({ ref: "SeriesType" })
  series?: Ref<SeriesType>;

  @Field((_type) => String)
  @prop({ ref: "UserType" })
  postedBy?: Ref<UserType>;

  @Field((_type) => [String])
  @arrayProp({ itemsRef: "TagType" })
  tags?: Ref<TagType>[];
}

export const Post = Utils.getModelFromTypegoose(PostType);

export const PostTryCrud = new TryCrud(Post);
export const PostPaginator = new Paginator<PostData, Post>({ model: Post });

export type Post = InstanceType<PostModel>;
export type PostModel = typeof Post;
export type PostData = I.TypegooseDocProps<PostType>;

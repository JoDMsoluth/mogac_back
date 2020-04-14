import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, arrayProp, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { TryCrud } from "../lib/mongoose-utils/try-crud";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { PostType } from "./Posts";

export namespace TagPropLimits {
  export const TitleLength = new IntegerRange(6, 70);
  export const DescriptionLength = new IntegerRange(3, 2000);
  export const ContentsLength = new IntegerRange(3, 10000);
}

export interface ITag {
  name: string;
  posts: any[];
}

@ObjectType("Tag")
export class TagType extends Typegoose implements ITag {
  @Field()
  @prop()
  get id(this: Tag): I.ObjectId {
    return this._id;
  }

  @Field()
  @prop({ required: true })
  name!: string;

  @Field(() => String)
  @arrayProp({ itemsRef: PostType })
  posts: Ref<PostType>[];
}

export const Tag = Utils.getModelFromTypegoose(TagType);

export const TagTryCrud = new TryCrud(Tag);
export const TagPaginator = new Paginator<TagData, Tag>({
  model: Tag,
});

export type Tag = InstanceType<TagModel>;
export type TagModel = typeof Tag;
export type TagData = I.TypegooseDocProps<TagType>;

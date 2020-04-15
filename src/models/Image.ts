import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { TryCrud } from "../lib/mongoose-utils/BaseRepo";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";

export namespace ImagePropLimits {
  export const TitleLength = new IntegerRange(6, 70);
  export const DescriptionLength = new IntegerRange(3, 2000);
  export const ContentsLength = new IntegerRange(3, 10000);
}

export interface IImage {
  image_url: string;
  filter: string;
}

@ObjectType("Image")
export class ImageType extends Typegoose implements IImage {
  @Field()
  @prop()
  get id(this: Image): I.ObjectId {
    return this._id;
  }

  @Field()
  @prop({ required: true })
  image_url!: string;

  @Field()
  @prop({ required: true })
  filter!: string;
}

export const Image = Utils.getModelFromTypegoose(ImageType);

export const ImageTryCrud = new TryCrud(Image);
export const ImagePaginator = new Paginator<ImageData, Image>({
  model: Image,
});

export type Image = InstanceType<ImageModel>;
export type ImageModel = typeof Image;
export type ImageData = I.TypegooseDocProps<ImageType>;

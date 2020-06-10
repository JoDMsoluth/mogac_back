import { Field, InputType } from "type-graphql";

import { LengthRange } from "../../../lib/decorators/length-range";
import { MessagePropLimits } from "../../../models/Message";
import { PostPropLimits } from "../../../models/Posts";
import { nullable } from "../../../lib/helper/flags";

@InputType()
export class AddPostRequestType {
  @Field()
  @LengthRange(PostPropLimits.TitleLength)
  title!: string;

  @Field({ nullable: true })
  @LengthRange(PostPropLimits.DescLength)
  desc?: string;

  @Field((_type) => [String], { nullable: true, defaultValue: [] })
  tags?: string[];

  @Field()
  @LengthRange(PostPropLimits.ContentsLength)
  contents!: string;

  @Field((_type) => [String], { nullable: true })
  image_url?: string[];

  @Field({ nullable: true, defaultValue: "" })
  cover_img?: string;

  @Field()
  category!: string;

  @Field()
  series?: string;
}

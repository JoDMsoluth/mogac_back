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

  @Field((_type) => [String], { nullable: true })
  tags?: string[];

  @Field()
  @LengthRange(PostPropLimits.TitleLength)
  contents!: string;

  @Field((_type) => [String], { nullable: true })
  image_url?: string[];

  @Field({ nullable: true })
  cover_img?: string;

  @Field()
  category!: string;

  @Field({ nullable: true })
  series?: string;
}

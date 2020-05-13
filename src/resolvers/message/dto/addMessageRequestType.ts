import { Field, InputType } from "type-graphql";

import { LengthRange } from "../../../lib/decorators/length-range";
import { MessagePropLimits } from "../../../models/Message";

@InputType()
export class AddMessageRequestType {
  @Field()
  sendUser: string;

  @Field()
  receiveUser: string;

  @Field()
  @LengthRange(MessagePropLimits.titleLength)
  title: string;

  @Field()
  @LengthRange(MessagePropLimits.contentsLength)
  contents: string;
}

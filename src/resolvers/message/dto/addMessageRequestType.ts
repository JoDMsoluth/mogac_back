import { Field, InputType } from "type-graphql";

import { LengthRange } from "../../../lib/decorators/length-range";
import { ObjectId } from "../../../lib/helper/interfaces";
import { MessagePropLimits } from "../../../models/Message";

@InputType()
export class AddMessageRequestType {
  @Field()
  sendUser: string;

  @Field()
  userId: string;

  @Field((_type) => String)
  @LengthRange(MessagePropLimits.titleLength)
  title: string;

  @Field()
  @LengthRange(MessagePropLimits.contentsLength)
  contents: string;
  
  @Field()
  sendUserName: string;
  
  @Field()
  sendUserEmail: string;
}

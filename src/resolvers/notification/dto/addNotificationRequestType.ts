import { Field, InputType } from "type-graphql";
import { LengthRange } from "../../../lib/decorators/length-range";
import { NotificationPropLimits } from "../../../models/Notification";

@InputType()
export class AddNotificationRequestType {
  @Field()
  url: string;

  @Field()
  userId: string;

  @Field()
  @LengthRange(NotificationPropLimits.titleLength)
  title: string;

  @Field()
  @LengthRange(NotificationPropLimits.contentsLength)
  contents: string;
}

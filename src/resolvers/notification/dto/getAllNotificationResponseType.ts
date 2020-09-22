import { NotificationType } from "./../../../models/Notification";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GetAllNotificationResponseType {
  @Field()
  lastPage: string;

  @Field((_type) => [NotificationType])
  docs: NotificationType[];
}

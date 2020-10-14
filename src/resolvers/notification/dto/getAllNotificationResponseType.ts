import { NotificationType } from "./../../../models/Notification";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class GetAllNotificationResponseType {
  @Field()
  lastPage: string;

  @Field((_type) => [NotificationType])
  docs: NotificationType[];

  @Field((_type) => Int)
  totalIsView: number;
}

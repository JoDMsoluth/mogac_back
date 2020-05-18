import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { NotificationType } from "../../models/Notification";
import { NotificationService } from "../../services/Notification.service";
import { PaginateArgType } from "../common/PaginateArgType";
import { AddNotificationRequestType } from "./dto/addNotificationRequestType";

@Resolver((of) => NotificationType)
export class NotificationResolver {
  constructor(
    // constructor injection of a service
    private readonly NotificationService: NotificationService
  ) {}

  @Mutation((_type) => NotificationType)
  async sendNotificationService(
    @Arg("data", () => AddNotificationRequestType)
    data: AddNotificationRequestType
  ) {
    this.NotificationService.createNotification(data);
  }
}

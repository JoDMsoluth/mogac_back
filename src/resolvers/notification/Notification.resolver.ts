import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg } from "type-graphql";
import { NotificationType } from "../../models/Notification";
import { NotificationService } from "../../services/Notification.service";
import { PaginateArgType } from "../common/PaginateArgType";

@Resolver((of) => NotificationType)
export class NotificationResolver {
  constructor(
    // constructor injection of a service
    private readonly NotificationService: NotificationService
  ) {}
}

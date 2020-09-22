import { GetAllNotificationResponseType } from "./dto/getAllNotificationResponseType";
import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation, Int, Ctx } from "type-graphql";
import { NotificationType } from "../../models/Notification";
import { NotificationService } from "../../services/Notification.service";
import { PaginateArgType } from "../common/PaginateArgType";
import { AddNotificationRequestType } from "./dto/addNotificationRequestType";
import { ResolveContext } from "../../lib/graphql/resolve-context";

@Resolver((of) => NotificationType)
export class NotificationResolver {
  constructor(
    // constructor injection of a service
    private readonly NotificationService: NotificationService
  ) {}

  @Query((_return) => GetAllNotificationResponseType)
  async getAllNotifications(
    @Arg("page", (_type) => Int) page: number,
    @Ctx() ctx: ResolveContext
  ): Promise<I.Maybe<GetAllNotificationResponseType>> {
    return await this.NotificationService.getNotificationByPage(
      page,
      ctx.user._id
    );
  }

  @Mutation((_return) => NotificationType)
  async viewNotification(
    @Arg("id") id: I.ObjectId
  ): Promise<I.Maybe<NotificationType>> {
    return await this.NotificationService.viewNotification(id);
  }
}

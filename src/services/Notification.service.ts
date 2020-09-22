import { NotificationType } from "./../models/Notification";
import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import * as I from "../lib/helper/interfaces";
import { NotificationRepo } from "../repositorys/NotificationRepo";
import { Notification } from "../models/Notification";

@Service()
export class NotificationService extends BaseServiceMixin(NotificationRepo) {
  constructor(protected model = Notification) {
    super(model);
  }

  async getAllNotifications(page, userId) {
    const notifications = this.getNotificationByPage(page, userId) as Promise<
      I.Maybe<{
        lastPage: string;
        docs: NotificationType[];
      }>
    >;
    console.log("notifications", notifications);
    return {
      lastPage: (await notifications).lastPage,
      posts: (await notifications).docs,
    };
  }

  async viewNotification(id) {
    const notification = this.tryUpdateById(id, { isView: true }) as Promise<
      I.Maybe<NotificationType>
    >;

    return notification;
  }
}

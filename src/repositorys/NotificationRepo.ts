import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import {
  NotificationModel,
  NotificationData,
  Notification,
} from "../models/Notification";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class NotificationRepo extends BaseRepo<NotificationModel> {
  protected readonly paginator = new Paginator<NotificationData, Notification>({
    model: Notification,
  });

  async getNotificationByPage(page, userId) {
    const docs = (await this.model
      .find({ userId })
      .sort({ createdAt: -1 })
      // .limit(9)
      // .skip((page - 1) * 9)
      .lean()
      .exec()) as any;

    const totalDoc: number = await this.model.find().count();
    const lastPage: string = Math.ceil(totalDoc / 9).toString();
    const totalIsView: number = await this.model.find({userId, isView:false}).count();
    return { lastPage, docs, totalIsView };
  }
}

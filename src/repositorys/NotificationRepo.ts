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
}

import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { NotificationRepo } from "../repositorys/NotificationRepo";
import { Notification } from "../models/Notification";

@Service()
export class NotificationService extends BaseServiceMixin(NotificationRepo) {
  constructor(protected model = Notification) {
    super(model);
  }

  async createNotification(data) {
    return this.model.create(data);
  }
}

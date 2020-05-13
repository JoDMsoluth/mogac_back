import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { BaseRepo } from "../repositorys/BaseRepo";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { UserType } from "./Users";

export namespace NotificationPropLimits {
  export const titleLength = new IntegerRange(1, 50);
  export const contentsLength = new IntegerRange(1, 255);
}

export interface INotification {
  sendDate: Date;
  receiveDate: Date;
  title: string;
  contents: string;
  url: string;
  kinds: string;
}

@ObjectType("Notification")
export class NotificationType extends Typegoose implements INotification {
  @Field()
  @prop()
  get id(this: Notification): I.ObjectId {
    return this._id;
  }

  @Field((_type) => Date)
  @prop({ required: true })
  sendDate!: Date;

  @Field((_type) => Date)
  @prop({ required: true })
  receiveDate!: Date;

  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop({ required: true })
  contents: string;

  @Field()
  @prop({ required: true })
  url: string;

  @Field()
  @prop({ required: true })
  kinds: string;
}

export const Notification = Utils.getModelFromTypegoose(NotificationType);

export const NotificationTryCrud = new BaseRepo(Notification);
export const NotificationPaginator = new Paginator<
  NotificationData,
  Notification
>({
  model: Notification,
});

export type Notification = InstanceType<NotificationModel>;
export type NotificationModel = typeof Notification;
export type NotificationData = I.TypegooseDocProps<NotificationType>;

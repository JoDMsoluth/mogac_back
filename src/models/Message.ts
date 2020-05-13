import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";

import { Typegoose, prop, Ref } from "@hasezoey/typegoose";
import { Field, ObjectType } from "type-graphql";
import { BaseRepo } from "../repositorys/BaseRepo";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { UserType } from "./Users";

export namespace MessagePropLimits {
  export const titleLength = new IntegerRange(1, 50);
  export const contentsLength = new IntegerRange(1, 255);
}

export interface IMessage {
  sendDate: Date;
  receiveDate: Date;
  title: string;
  contents: string;
  sendUser: any;
  receiveUser: any;
}

@ObjectType("Message")
export class MessageType extends Typegoose implements IMessage {
  @Field()
  @prop()
  get id(this: Message): I.ObjectId {
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

  @Field((_type) => UserType)
  @prop({ required: true })
  sendUser: Ref<UserType>;

  @Field((_type) => UserType)
  @prop({ required: true })
  receiveUser: Ref<UserType>;
}

export const Message = Utils.getModelFromTypegoose(MessageType);

export const MessageTryCrud = new BaseRepo(Message);
export const MessagePaginator = new Paginator<MessageData, Message>({
  model: Message,
});

export type Message = InstanceType<MessageModel>;
export type MessageModel = typeof Message;
export type MessageData = I.TypegooseDocProps<MessageType>;

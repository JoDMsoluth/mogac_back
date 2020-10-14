import { MessageType } from "./../models/Message";
import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { MessageRepo } from "../repositorys/MessageRepo";
import * as I from "../lib/helper/interfaces";
import { Message } from "../models/Message";

@Service()
export class MessageService extends BaseServiceMixin(MessageRepo) {
  constructor(protected model = Message) {
    super(model);
  }

  async getAllMessages(page, userId) {
    const messages = this.getMessagesByPage(page, userId) as Promise<
      I.Maybe<{
        lastPage: string;
        docs: MessageType[];
      }>
    >;
    console.log("messages", messages);
    return {
      lastPage: (await messages).lastPage,
      posts: (await messages).docs,
    };
  }

  async viewMessage(id) {
    const message = this.tryUpdateById(id, { isView: true }) as Promise<
      I.Maybe<MessageType>
    >;

    return message;
  }

  
  async updateIsView(id) {
    const message = this.tryUpdateById(id, { isView: true }) as Promise<
      I.Maybe<MessageType>
    >;
    console.log("updateIsView service result", message);
    return message;
  }
}

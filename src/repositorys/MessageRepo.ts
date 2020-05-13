import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { MessageModel, MessageData, Message } from "../models/Message";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class MessageRepo extends BaseRepo<MessageModel> {
  protected readonly paginator = new Paginator<MessageData, Message>({
    model: Message,
  });
}

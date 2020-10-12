import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { MessageModel, MessageData, Message } from "../models/Message";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class MessageRepo extends BaseRepo<MessageModel> {
  protected readonly paginator = new Paginator<MessageData, Message>({
    model: Message,
  });

  async getMessagesByPage(page, userId) {
    const docs = (await this.model
      .find({ userId })
      .sort({ isView: -1 })
      .sort({ createdAt: -1 })
      .limit(9)
      .skip((page - 1) * 9)
      .lean()
      .exec()) as any;

    const totalDoc: number = await this.model.find().count();
    const lastPage: string = Math.ceil(totalDoc / 9).toString();
    return { lastPage, docs };
  }
}

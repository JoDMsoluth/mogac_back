import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { MessageRepo } from "../repositorys/MessageRepo";
import { Message } from "../models/Message";

@Service()
export class MessageService extends BaseServiceMixin(MessageRepo) {
  constructor(protected model = Message) {
    super(model);
  }
}

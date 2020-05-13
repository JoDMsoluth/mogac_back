import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg } from "type-graphql";
import { MessageType } from "../../models/Message";
import { MessageService } from "../../services/Message.service";
import { PaginateArgType } from "../common/PaginateArgType";

@Resolver((of) => MessageType)
export class MessageResolver {
  constructor(
    // constructor injection of a service
    private readonly MessageService: MessageService
  ) {}
}

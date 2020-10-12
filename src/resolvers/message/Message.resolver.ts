import { getAllMessageResponseType } from "./dto/getAllMessageResponseType";
import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Int, Mutation, Ctx } from "type-graphql";
import { MessageType } from "../../models/Message";
import { MessageService } from "../../services/Message.service";
import { PaginateArgType } from "../common/PaginateArgType";
import { ResolveContext } from "../../lib/graphql/resolve-context";

@Resolver((of) => MessageType)
export class MessageResolver {
  constructor(
    // constructor injection of a service
    private readonly MessageService: MessageService
  ) {}

  // 메시지 작성
  

  @Query((_return) => getAllMessageResponseType)
  async getAllMessages(
    @Arg("page", (_type) => Int) page: number,
    @Ctx() ctx: ResolveContext
  ): Promise<I.Maybe<getAllMessageResponseType>> {
    return await this.MessageService.getMessagesByPage(page, ctx.user._id);
  }

  @Mutation((_return) => MessageType)
  async viewMessage(@Arg("id") id: I.ObjectId): Promise<I.Maybe<MessageType>> {
    return await this.MessageService.viewMessage(id);
  }
}

import * as I from "../../lib/helper/interfaces";
import { UserType } from "../../models/Users";
import { Resolver, Query, Arg, Ctx } from "type-graphql";
import { UserService } from "../../services/Users.service";
import { Service } from "typedi";
import { PaginateArgType } from "../common/PaginateArgType";
import { ResolveContext } from "../../lib/graphql/resolve-context";
import { GetAllUserResponseType } from "./dto/getAllUserResponseType";

@Service()
@Resolver((of) => UserType)
export class UserResolver {
  constructor(
    // constructor injection of a service
    private readonly userService: UserService
  ) {}

  @Query((_return) => GetAllUserResponseType)
  async getAllUser(
    @Arg("data") data: PaginateArgType,
    @Ctx() ctx: ResolveContext
  ): Promise<I.Maybe<GetAllUserResponseType>> {
    // 최대 페이지, 현제 페이지 내용 받기
    return await this.userService.getAllUsers(data);
  }

  @Query((_return) => [UserType])
  async getUsersByTeam(
    @Arg("id") id: I.ObjectId,
    @Arg("data") data: PaginateArgType
  ) {
    return this.userService.getAllUsersByTeam(id, data);
  }
}

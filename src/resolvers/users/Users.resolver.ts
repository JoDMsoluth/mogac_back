import * as I from "../../lib/helper/interfaces";
import { UserType, UserTryCrud, User } from "../../models/Users";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Team } from "../../models/Teams";
import { NotFoundError } from "../../lib/helper/statused-error";
import { SignupRequestType } from "./signupRequestType";
import { IdNotFoundError } from "../../repositorys/BaseRepo";
import { UpdateUserRequest } from "./updateUserRequest";
import { UserService } from "../../services/Users.service";
import { Service } from "typedi";

@Service()
@Resolver((of) => UserType)
export class UserResolver {
  constructor(
    // constructor injection of a service
    private readonly userService: UserService
  ) {}

  @Query((_return) => [UserType])
  async getUsersByTeam(@Arg("id") id: I.ObjectId) {
    const users = Team.findById({ id })
      .populate({ path: "users" })
      .lean()
      .exec();
    if (!users) {
      throw new NotFoundError();
    }
    return users;
  }
}

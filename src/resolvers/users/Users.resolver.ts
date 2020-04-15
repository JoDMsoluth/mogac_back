import * as I from "../../lib/helper/interfaces";
import { UserType, UserTryCrud, User } from "../../models/Users";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Team } from "../../models/Teams";
import { NotFoundError } from "../../lib/helper/statused-error";
import { SignupRequestType } from "./signupRequestType";
import { IdNotFoundError } from "../../lib/mongoose-utils/BaseRepo";
import { UpdateUserRequest } from "./updateUserRequest";

@Resolver()
export class UserResolver {
  // implements ResolverInterface<UserData> {

  @Query((_returns) => UserType)
  async getUser(@Arg("id") id: I.ObjectId) {
    return UserTryCrud.tryFindById(id);
  }

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

  // signup user
  @Mutation((_type) => UserType)
  async createUser(@Arg("req") signupData: SignupRequestType) {
    return User.create(signupData);
  }

  // update user
  @Mutation((_type) => UserType)
  async updateUser(
    @Arg("id") id: I.ObjectId,
    @Arg("req", { nullable: true }) updateDate?: UpdateUserRequest
  ) {
    return UserTryCrud.tryUpdateById(id, updateDate);
  }

  // delete user
  @Mutation((_type) => UserType)
  async deleteUser(@Arg("id") id: I.ObjectId) {
    return UserTryCrud.tryDeleteById(id);
  }
}

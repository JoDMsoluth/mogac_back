import { Service } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { UserRepo } from "../repositorys/UserRepo";
import { User, UserType } from "../models/Users";
import { Team } from "../models/Teams";
import { NotFoundError } from "../lib/helper/statused-error";
import * as I from "../lib/helper/interfaces";
import { Arg } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { rejects } from "assert";
import { createWriteStream } from "fs";
import { Upload } from "../lib/helper/interfaces";

@Service()
export class UserService extends BaseServiceMixin(UserRepo) {
  constructor(protected model = User) {
    super(model);
  }

  async getAllUsers({ page, limit }) {
    const query = {};
    const users = this.getAll(page, limit, query) as Promise<
      I.Maybe<{
        lastPage: string;
        docs: UserType[];
      }>
    >;
    return { lastPage: (await users).lastPage, users: (await users).docs };
  }

  async getAllUsersByTeam(id, { page, limit }) {
    const users = Team.findById({ id })
      .populate({ path: "users" })
      .skip((page - 1) * limit) // 앞의 몇개를 건너뛸까
      .limit(limit) // 몇개를 가져올까
      .lean()
      .exec();
    if (!users) {
      throw new NotFoundError();
    }
    return users;
  }
}

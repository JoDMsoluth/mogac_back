import { Service } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { UserRepo } from "../repositorys/UserRepo";
import { User } from "../models/Users";

@Service()
export class UserService extends BaseServiceMixin(UserRepo) {
  constructor(protected model = User) {
    super(model);
  }

  async login() {}

  async logout() {}
}

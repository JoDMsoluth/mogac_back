import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { UserModel, UserData, User } from "../models/Users";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class UserRepo extends BaseRepo<UserModel> {
  protected readonly paginator = new Paginator<UserData, User>({ model: User });
  constructor(protected model = User) {
    super(model);
  }
}

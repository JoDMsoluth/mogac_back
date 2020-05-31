import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { UserModel, UserData, User } from "../models/Users";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { NotFoundError } from "../lib/helper/statused-error";
import * as I from "../lib/helper/interfaces";

@Service()
export class UserRepo extends BaseRepo<UserModel> {
  protected readonly paginator = new Paginator<UserData, User>({ model: User });
  constructor(protected model = User) {
    super(model);
  }

  async getPostsByNmaeForPostView(name: string) {
    // 포스트리스트(작성시간, 작성시간순으로, title, contents,  id)
    const doc = await this.model
      .findOne({ name })
      .populate({ path: "posts", select: "_id title createdAt desc" })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    console.log("doc", doc);
    if (!doc) {
      throw new NotFoundError(name);
    }
    return doc;
  }
}

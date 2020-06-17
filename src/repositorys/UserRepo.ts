import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { UserModel, UserData, User } from "../models/Users";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { NotFoundError } from "../lib/helper/statused-error";
import * as I from "../lib/helper/interfaces";
import { ResolveContext } from "../lib/graphql/resolve-context";
import { Allow } from "class-validator";

@Service()
export class UserRepo extends BaseRepo<UserModel> {
  protected readonly paginator = new Paginator<UserData, User>({ model: User });
  constructor(protected model = User) {
    super(model);
  }

  async getPostsByNameForPostView(name: string) {
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

  async getUsersByMatching(ableLocation, ableSkillSet) {
    const users = await this.model
      .find({
        ableLocation: { $in: ableLocation },
        level: { $in: ableSkillSet },
      })
      .lean()
      .exec();
    console.log(users);
    return users;
  }

  async getNearUsersByMatching(
    ableLocation,
    ableSkillSet,
    ctx: ResolveContext
  ) {
    const users = await this.model.find({
      ableLocation: { $in: ableLocation },
      level: { $in: ableSkillSet },
      x_pos: { $gte: ctx.user.x_pos - 0.1, $lte: ctx.user.x_pos + 0.1 },
      y_pos: { $gte: ctx.user.y_pos - 0.1, $lte: ctx.user.y_pos + 0.1 },
    });
    console.log(users);
    return users;
  }
}

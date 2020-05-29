import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { CommentRepo } from "../repositorys/CommentRepo";
import { Comment } from "../models/Comments";
import { Log } from "../lib/helper/debug";
import * as I from "../lib/helper/interfaces";
import { PostType } from "../models/Posts";
import { ResolveContext } from "../lib/graphql/resolve-context";

@Service()
export class CommentService extends BaseServiceMixin(CommentRepo) {
  constructor(protected model = Comment) {
    super(model);
  }

  async createComment(data, ctx: ResolveContext) {
    try {
      return await this.model.create({
        ...data,
        commentBy: ctx.user._id,
      });
    } catch (e) {
      Log.error(e);
    }
  }

  async deletePost(commentId) {
    try {
      return await this.model.findByIdAndRemove(commentId);
    } catch (e) {
      Log.error(e);
    }
    return;
  }
}

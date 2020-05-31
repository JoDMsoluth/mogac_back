import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { CommentRepo } from "../repositorys/CommentRepo";
import { Comment, CommentType } from "../models/Comments";
import { Log } from "../lib/helper/debug";
import * as I from "../lib/helper/interfaces";
import { PostType } from "../models/Posts";
import { ResolveContext } from "../lib/graphql/resolve-context";
import { userInfo } from "os";
import { UpdateCommentRequestType } from "../resolvers/comment/dto/CommentRequestType";

@Service()
export class CommentService extends BaseServiceMixin(CommentRepo) {
  constructor(protected model = Comment) {
    super(model);
  }

  async checkWriter(commentId, ctx: ResolveContext) {
    const comment = (await this.tryFindById(commentId)) as CommentType;
    return comment.commentBy == commentId;
  }

  async deleteCommentById(commentId, ctx: ResolveContext) {
    if (this.checkWriter(commentId, ctx)) {
      return await this.deleteComment(commentId);
    } else {
      Log.error("Please Login");
    }
  }

  async updateCommentById(data: UpdateCommentRequestType, ctx: ResolveContext) {
    if (this.checkWriter(data.commentId, ctx)) {
      return await this.tryUpdateById(data.commentId, {
        contents: data.contents,
        secret: data.secret,
      });
    } else {
      Log.error("Please Login");
    }
  }
}

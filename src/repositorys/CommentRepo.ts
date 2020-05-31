import { Service } from "typedi";
import { BaseRepo, IdNotFoundError } from "./BaseRepo";
import {
  CommentModel,
  CommentData,
  Comment,
  CommentType,
} from "../models/Comments";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { Log } from "../lib/helper/debug";
import { ResolveContext } from "../lib/graphql/resolve-context";
import {
  AddCommentRequestType,
  UpdateCommentRequestType,
} from "../resolvers/comment/dto/CommentRequestType";
import { AddReCommentRequestType } from "../resolvers/comment/dto/addReCommentRequestType";

@Service()
export class CommentRepo extends BaseRepo<CommentModel> {
  protected readonly paginator = new Paginator<CommentData, Comment>({
    model: Comment,
  });
  async getAllCommentByPostId(postId) {
    try {
      return await this.model.find({ parentPost: postId }).lean().exec();
    } catch (e) {
      Log.error(e);
    }
  }

  async getAllReCommentByCommentId(commentId) {
    try {
      return await this.model.find({ parentComment: commentId }).lean().exec();
    } catch (e) {
      Log.error(e);
    }
  }

  async createComment(data: AddCommentRequestType, ctx: ResolveContext) {
    console.log("ctx.user._id", ctx.user._id);
    if (ctx.user._id) {
      try {
        return await this.model.create({
          ...data,
          commentBy: ctx.user._id,
        });
      } catch (e) {
        Log.error(e);
      }
    }
    Log.error("Please Login");
  }

  async createReComment(data: AddReCommentRequestType, ctx: ResolveContext) {
    console.log("ctx.user._id", ctx.user._id);
    console.log("data", data);
    if (ctx.user._id) {
      try {
        return await this.model.create({
          ...data,
          commentBy: ctx.user._id,
        });
      } catch (e) {
        Log.error(e);
      }
    }
    Log.error("Please Login");
  }

  async deleteComment(commentId: string) {
    try {
      return await this.model.findByIdAndRemove(commentId);
    } catch (e) {
      Log.error(e);
    }
  }

  async getCommentByPostId(postId) {
    const doc = await this.model
      .find({ parentPost: postId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }
}

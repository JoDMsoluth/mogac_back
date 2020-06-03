import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { CommentRepo } from "../repositorys/CommentRepo";
import { Comment, CommentType } from "../models/Comments";
import { Log } from "../lib/helper/debug";
import * as I from "../lib/helper/interfaces";
import { PostType } from "../models/Posts";
import { ResolveContext } from "../lib/graphql/resolve-context";
import { userInfo } from "os";
import {
  UpdateCommentRequestType,
  AddCommentRequestType,
} from "../resolvers/comment/dto/CommentRequestType";
import { AddReCommentRequestType } from "../resolvers/comment/dto/addReCommentRequestType";

@Service()
export class CommentService extends BaseServiceMixin(CommentRepo) {
  constructor(protected model = Comment) {
    super(model);
  }

  async checkWriter(commentId, ctx: ResolveContext) {
    const comment = (await this.tryFindById(commentId)) as any;
    // objectID 와 objectId 끼리 비교하기 위해선 equals 함수를 사용
    return comment.commentBy.equals(ctx.user._id);
  }

  async calNumOfReComment(parentComment) {
    return this.model.find({ parentComment }).estimatedDocumentCount().exec();
  }

  async deleteCommentById(commentId, ctx: ResolveContext) {
    if (await this.checkWriter(commentId, ctx)) {
      return await this.deleteComment(commentId);
    } else {
      Log.error("Please Login");
    }
  }

  async updateCommentById(data: UpdateCommentRequestType, ctx: ResolveContext) {
    console.log("ctx", ctx.user._id);
    if (await this.checkWriter(data.commentId, ctx)) {
      return await this.updateComment(data);
    } else {
      Log.error("Please Login");
    }
  }

  async createCommentInPost(data: AddCommentRequestType, ctx: ResolveContext) {
    console.log("ctx.user._id", ctx.user._id);
    if (ctx.user._id) {
      try {
        return await this.createComment(data, ctx)
          .then((result) => this.findCommentByUserDetail(result._id))
          .then((comment) => comment);
      } catch (err) {
        Log.error(err);
      }
    }
    Log.error("Please Login");
  }

  async createReCommentInComment(
    data: AddReCommentRequestType,
    ctx: ResolveContext
  ) {
    console.log("ctx.user._id", ctx.user._id);
    if (ctx.user._id) {
      try {
        const comment = await this.createReComment(data, ctx)
          .then((result) => this.findCommentByUserDetail(result._id))
          .then((comment) => comment);
        console.log("comment", comment);
        if (comment) {
          const parentComment = await this.model
            .findById(comment.parentComment)
            .exec();
          console.log("parentComment", parentComment);
          const reComments = await this.calNumOfReComment(
            comment.parentComment
          );
          console.log("reComments num", reComments);
          this.tryUpdateById(parentComment._id, {
            reComments,
          });
          return comment;
        }
      } catch (err) {
        Log.error(err);
      }
    }
    Log.error("Please Login");
  }

  async deleteReCommentById(commentId, ctx: ResolveContext) {
    if (await this.checkWriter(commentId, ctx)) {
      const comment = await this.deleteComment(commentId);
      console.log("comment", comment);
      if (comment) {
        const parentComment = await this.model
          .findById(comment.parentComment)
          .exec();
        console.log("parentComment", parentComment);
        const reComments = await this.calNumOfReComment(comment.parentComment);
        console.log("reComments num", reComments);
        this.tryUpdateById(parentComment._id, {
          reComments,
        });
        return comment;
      }
    } else {
      Log.error("Please Login");
    }
  }
}

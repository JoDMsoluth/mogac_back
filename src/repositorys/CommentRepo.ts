import { Service } from "typedi";
import { BaseRepo, IdNotFoundError } from "./BaseRepo";
import {
  CommentModel,
  CommentData,
  Comment,
  CommentType,
} from "../models/Comments";
import * as I from "../lib/helper/interfaces";
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
      return await this.model
        .find({ parentPost: postId })
        .populate({ path: "commentBy", select: "_id name image_url" })
        .lean()
        .exec();
    } catch (e) {
      Log.error(e);
    }
  }

  async getAllReCommentByCommentId(commentId) {
    try {
      return await this.model
        .find({ parentComment: commentId })
        .populate({ path: "commentBy", select: "_id name image_url" })
        .lean()
        .exec();
    } catch (e) {
      Log.error(e);
    }
  }

  async createComment(data: AddCommentRequestType, ctx: ResolveContext) {
    try {
      return await this.model.create({
        ...data,
        commentBy: ctx.user._id,
      });
    } catch (e) {
      Log.error(e);
    }
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
      return await await this.model.findByIdAndRemove(commentId);
    } catch (e) {
      Log.error(e);
    }
  }

  async findCommentByUserDetail(commentId: string) {
    try {
      return await this.model
        .findById(commentId)
        .populate({ path: "commentBy", select: "_id name image_url" })
        .lean()
        .exec();
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

  async updateComment(data: UpdateCommentRequestType) {
    const updatedDoc = await this.model
      .findByIdAndUpdate(
        data.commentId,
        { contents: data.contents, secret: data.secret },
        { new: true }
      )
      .populate({ path: "commentBy", select: "_id image_url name" })
      .lean()
      .exec();
    if (updatedDoc == null) {
      throw new IdNotFoundError((data.commentId as unknown) as I.ObjectId);
    }
    console.log("updated : ", updatedDoc);
    return updatedDoc;
  }
}

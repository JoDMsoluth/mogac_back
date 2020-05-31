import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { CommentType } from "../../models/Comments";
import { CommentService } from "../../services/Comment.service";
import {
  AddCommentRequestType,
  UpdateCommentRequestType,
} from "./dto/CommentRequestType";
import { ResolveContext } from "../../lib/graphql/resolve-context";
import { PostService } from "../../services/post.service";
import { Log } from "../../lib/helper/debug";
import { AddReCommentRequestType } from "./dto/addReCommentRequestType";

@Resolver((of) => CommentType)
export class CommentResolver {
  constructor(
    // constructor injection of a service
    private readonly CommentService: CommentService,
    private readonly PostService: PostService
  ) {}
  @Query((_return) => [CommentType])
  async getAllCommentInPost(@Arg("postId") postId: string) {
    return await this.CommentService.getAllCommentByPostId(postId);
  }

  @Query((_return) => [CommentType])
  async getAllReCommentInComment(@Arg("commentId") commentId: string) {
    return await this.CommentService.getAllReCommentByCommentId(commentId);
  }

  @Mutation((_return) => CommentType)
  async createComment(
    @Arg("data") data: AddCommentRequestType,
    @Ctx() ctx: ResolveContext
  ) {
    const comment = await this.CommentService.createComment(data, ctx)
      .then((result) => {
        this.PostService.pushComment(data.parentPost, result._id);
        return result;
      })
      .catch((err) => Log.error(err));
    return comment;
  }

  @Mutation((_return) => CommentType)
  async createReComment(
    @Arg("data") data: AddReCommentRequestType,
    @Ctx() ctx: ResolveContext
  ) {
    const reComment = await this.CommentService.createReComment(data, ctx)
      .then((comment) => comment)
      .catch((err) => Log.error(err));
    console.log("reComment", reComment);
    return reComment;
  }

  @Mutation((_return) => CommentType)
  async deleteComment(
    @Arg("commentId") commentId: string,
    @Arg("postId") postId: string,
    @Ctx() ctx: ResolveContext
  ) {
    return await this.CommentService.deleteCommentById(commentId, ctx)
      .then((comment) => {
        this.PostService.filterComment(postId, comment._id);
        return comment;
      })
      .catch((err) => Log.error(err));
  }

  @Mutation((_return) => CommentType)
  async deleteReComment(
    @Arg("reCommentId") reCommentId: string,
    @Ctx() ctx: ResolveContext
  ) {
    return await this.CommentService.deleteCommentById(
      reCommentId,
      ctx
    ).catch((err) => Log.error(err));
  }

  @Mutation((_return) => CommentType)
  async updateComment(
    @Arg("data") data: UpdateCommentRequestType,
    @Ctx() ctx: ResolveContext
  ) {
    return await this.updateComment;
  }
}

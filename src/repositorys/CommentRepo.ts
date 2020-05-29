import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { CommentModel, CommentData, Comment } from "../models/Comments";
import { Paginator } from "../lib/mongoose-utils/paginate";
import * as I from "../lib/helper/interfaces";

@Service()
export class CommentRepo extends BaseRepo<CommentModel> {
  protected readonly paginator = new Paginator<CommentData, Comment>({
    model: Comment,
  });

  async getCommentByPostId(postId) {
    const doc = await this.model
      .find({ parentPost: postId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }
}

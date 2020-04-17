import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { CommentModel, CommentData, Comment } from "../models/Comments";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class CommentRepo extends BaseRepo<CommentModel> {
  protected readonly paginator = new Paginator<CommentData, Comment>({
    model: Comment,
  });
}

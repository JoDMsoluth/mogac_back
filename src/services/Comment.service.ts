import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { CommentRepo } from "../repositorys/CommentRepo";
import { Comment } from "../models/Comments";

@Service()
export class CommentService extends BaseServiceMixin(CommentRepo) {
  constructor(protected model = Comment) {
    super(model);
  }
}

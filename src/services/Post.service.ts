import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { PostRepo } from "../repositorys/PostRepo";
import { Post } from "../models/Posts";

@Service()
export class PostService extends BaseServiceMixin(PostRepo) {
  constructor(protected model = Post) {
    super(model);
  }
}

import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { PostModel, PostData, Post } from "../models/Posts";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class PostRepo extends BaseRepo<PostModel> {
  protected readonly paginator = new Paginator<PostData, Post>({ model: Post });
}

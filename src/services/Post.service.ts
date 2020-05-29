import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { PostRepo } from "../repositorys/PostRepo";
import { Post, PostType } from "../models/Posts";
import { Log } from "../lib/helper/debug";
import * as I from "../lib/helper/interfaces";
import { ResolveContext } from "../lib/graphql/resolve-context";
import { AddPostRequestType } from "../resolvers/post/dto/addPostRequestType";

@Service()
export class PostService extends BaseServiceMixin(PostRepo) {
  constructor(protected model = Post) {
    super(model);
  }

  async getAllPosts({ page, limit }) {
    const query = {};
    const posts = this.getAll(page, limit, query) as Promise<
      I.Maybe<{
        lastPage: string;
        docs: PostType[];
      }>
    >;
    console.log("posts", posts);
    return { lastPage: (await posts).lastPage, posts: (await posts).docs };
  }

  async createPost(data: AddPostRequestType, ctx: ResolveContext) {
    try {
      return await this.model.create({
        ...data,
        postedBy: ctx.user._id,
      });
    } catch (e) {
      Log.error(e);
    }
  }

  async deletePost(postId) {
    try {
      return await this.model.findByIdAndRemove(postId);
    } catch (e) {
      Log.error(e);
    }
    return;
  }
}

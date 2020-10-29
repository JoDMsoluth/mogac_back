import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation, Ctx, Int } from "type-graphql";
import { PostType } from "../../models/Posts";
import { PostService } from "../../services/Post.service";
import { PaginateArgType } from "../common/PaginateArgType";
import { CategoryService } from "../../services/Category.service";
import { CategoryType } from "../../models/Category";
import mongoose from "../../models";
import { Log } from "../../lib/helper/debug";
import { UserService } from "../../services/Users.service";
import { ResolveContext } from "../../lib/graphql/resolve-context";
import { AddPostRequestType } from "./dto/addPostRequestType";
import { GetAllUserResponseType } from "../users/dto/getAllUserResponseType";
import { GetAllPostResponseType } from "./dto/getAllPostResponseType";

@Resolver((of) => PostType)
export class PostResolver {
  constructor(
    // constructor injection of a service
    private readonly PostService: PostService,
    private readonly UserService: UserService
  ) {}

  @Query((_return) => PostType)
  async getPost(@Arg("postId") postId: string): Promise<PostType> {
    return await this.PostService.getPostForView(postId);
  }

  @Query((_return) => GetAllPostResponseType)
  async getAllPosts(
    @Arg("page", (_type) => Int) page: number
  ): Promise<I.Maybe<GetAllPostResponseType>> {
    return await this.PostService.getAllPosts(page);
  }

  @Mutation((_return) => PostType)
  async createPost(
    @Arg("data") data: AddPostRequestType,
    @Ctx() ctx: ResolveContext
  ): Promise<PostType> {
    //data 속에 seriesId가 들어갈 수 있다.
    
    if (ctx.user._id) {
      const post = await this.PostService.createPost(data, ctx);
      
      await this.UserService.pushPost(post._id, ctx);
      await this.UserService.plusPoint(ctx.user._id, 10);
      return post;
    }
  }

  @Mutation((_return) => PostType)
  async deletePost(
    @Arg("postId") postId: string,
    @Ctx() ctx: ResolveContext
  ): Promise<PostType> {
    if (ctx.user._id) {
      await this.UserService.filterPost(postId, ctx);
      return await this.PostService.deletePost(postId);
    }
  }
}

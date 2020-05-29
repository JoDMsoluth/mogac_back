import { Service } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { UserRepo } from "../repositorys/UserRepo";
import { User, UserType } from "../models/Users";
import { Team } from "../models/Teams";
import { NotFoundError } from "../lib/helper/statused-error";
import * as I from "../lib/helper/interfaces";
import { Arg, Ctx } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { rejects } from "assert";
import { createWriteStream } from "fs";
import { Upload } from "../lib/helper/interfaces";
import { ResolveContext } from "../lib/graphql/resolve-context";
import { IdNotFoundError } from "../repositorys/BaseRepo";

@Service()
export class UserService extends BaseServiceMixin(UserRepo) {
  constructor(protected model = User) {
    super(model);
  }

  async pushPost(postId, ctx: ResolveContext) {
    ctx.user.posts.push(postId);
    const updateDoc = await this.model.findByIdAndUpdate(
      ctx.user._id,
      {
        posts: ctx.user.posts,
      },
      { new: true }
    );
    console.log("updateDoc", updateDoc);
    if (updateDoc == null) {
      throw new IdNotFoundError(postId);
    }

    return updateDoc.posts;
  }
  async pushSeries(seriesId, ctx: ResolveContext) {
    console.log("series", ctx.user);
    ctx.user.series.push(seriesId);
    console.log("series", ctx.user.series);
    const updateDoc = await this.model.findByIdAndUpdate(
      ctx.user._id,
      {
        series: ctx.user.series,
      },
      { new: true }
    );
    console.log("updateDoc", updateDoc);
    if (updateDoc == null) {
      throw new IdNotFoundError(seriesId);
    }

    return updateDoc.series;
  }

  async filterPost(postId, ctx: ResolveContext) {
    console.log("series", ctx.user);
    console.log("postId", postId);
    // !== 로 하지말고 !=로 해야 지워진다.
    const filterPost = ctx.user.posts.filter((v) => v != postId);
    console.log("posts", ctx.user.posts);
    const updateDoc = await this.model.findByIdAndUpdate(
      ctx.user._id,
      {
        posts: filterPost,
      },
      { new: true }
    );
    console.log("updateDoc", updateDoc);
    if (updateDoc == null) {
      throw new IdNotFoundError(postId);
    }

    return updateDoc.posts;
  }

  async filterSeries(seriesId, ctx: ResolveContext) {
    console.log("series", ctx.user);
    // !== 로 하지말고 !=로 해야 지워진다.
    const filterSeries = ctx.user.series.filter((v) => v != seriesId);
    console.log("series", ctx.user.series);
    const updateDoc = await this.model.findByIdAndUpdate(
      ctx.user._id,
      {
        series: filterSeries,
      },
      { new: true }
    );
    console.log("updateDoc", updateDoc);
    if (updateDoc == null) {
      throw new IdNotFoundError(seriesId);
    }

    return updateDoc.series;
  }

  async getAllUsers({ page, limit }) {
    const query = {};
    const users = this.getAll(page, limit, query) as Promise<
      I.Maybe<{
        lastPage: string;
        docs: UserType[];
      }>
    >;
    return { lastPage: (await users).lastPage, users: (await users).docs };
  }
  async getAllSeriesByUser(userId) {
    try {
      console.log("userId", userId);
      const user = await this.model
        .findById(userId)
        .populate({ path: "series" });
      console.log("user.series", user);
      return user;
    } catch (e) {
      throw new IdNotFoundError(userId);
    }
  }

  async getAllUsersByTeam(id, { page, limit }) {
    const users = Team.findById({ id })
      .populate({ path: "users" })
      .skip((page - 1) * limit) // 앞의 몇개를 건너뛸까
      .limit(limit) // 몇개를 가져올까
      .lean()
      .exec();
    if (!users) {
      throw new NotFoundError();
    }
    return users;
  }
}

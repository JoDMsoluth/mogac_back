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
import { Log } from "../lib/helper/debug";

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

  async pushTeam(teamId, userId: I.ObjectId) {
    const getUser = (await this.tryFindById(userId)) as I.Maybe<UserType>;
    getUser.teams.push(teamId);
    const updateDoc = await this.model.findByIdAndUpdate(
      userId,
      {
        teams: getUser.teams,
      },
      { new: true }
    );
    console.log("updateDoc", updateDoc);
    if (updateDoc == null) {
      throw new IdNotFoundError(teamId);
    }

    return updateDoc.teams;
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

  async filterTeam(teamId, ctx: ResolveContext) {
    console.log("series", ctx.user);
    console.log("teamId", teamId);
    // !== 로 하지말고 !=로 해야 지워진다.
    const filterTeam = ctx.user.teams.filter((v) => v != teamId);
    console.log("teams", ctx.user.teams);
    const updateDoc = await this.model.findByIdAndUpdate(
      ctx.user._id,
      {
        teams: filterTeam,
      },
      { new: true }
    );
    console.log("updateDoc", updateDoc);
    if (updateDoc == null) {
      throw new IdNotFoundError(teamId);
    }

    return updateDoc.teams;
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

  async getAllPostsByUser(page, userId) {
    try {
      console.log("userId", userId);
      const user = await this.model
        .findById(userId)
        .populate({ path: "posts" });
      console.log("user.posts", user);
      return user;
    } catch (e) {
      throw new IdNotFoundError(userId);
    }
  }

  async getAllTeamsByUser(page, userId) {
    try {
      console.log("userId", userId);
      const user = await this.model
        .findById(userId)
        .populate({ path: "teams" });
      console.log("user.teams", user);
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

  async checkUniqueEmail(email: string) {
    try {
      const check = await this.model.find({ email }).lean().exec();
      console.log(check);
      if (check.length > 0) return false;
      return true;
    } catch (e) {
      Log.error(e);
    }
  }
  async checkUniqueName(name: string) {
    try {
      const check = await this.model.find({ name }).lean().exec();
      console.log(check);
      if (check.length > 0) return false;
      return true;
    } catch (e) {
      Log.error(e);
    }
  }

  async updatePosition(position: number[], ctx: ResolveContext) {
    const users = this.tryUpdateById(ctx.user._id, {
      x_pos: position[0],
      y_pos: position[1],
    });
    console.log("updatePositon service result", position[0], position[1]);
    return users;
  }

  async plusSkilllevel(skill: string, point: number, ctx: ResolveContext) {
    try {
      const setSkillSetArray = [];
      for (const level of ctx.user.level) {
        const skillset = level.split("/");
        const skillName: string = skillset[0];
        let skillLevel: number = parseInt(skillset[1], 10);
        if (skillName === skill) {
          skillLevel += point;
          console.log("skillName", skillName, "skillLevel", skillLevel);
        }
        const setSkillSet = skillName.concat(`/${skillLevel}`);
        setSkillSetArray.push(setSkillSet);
      }
      console.log("setSkillSetArray", setSkillSetArray);
      return await this.tryUpdateById(ctx.user._id, {
        level: setSkillSetArray,
      });
    } catch (error) {
      Log.error(error);
    }
  }
}

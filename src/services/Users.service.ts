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
    
    if (updateDoc == null) {
      throw new IdNotFoundError(teamId);
    }

    return updateDoc.teams;
  }

  async pushSeries(seriesId, ctx: ResolveContext) {
    
    ctx.user.series.push(seriesId);
    
    const updateDoc = await this.model.findByIdAndUpdate(
      ctx.user._id,
      {
        series: ctx.user.series,
      },
      { new: true }
    );
    
    if (updateDoc == null) {
      throw new IdNotFoundError(seriesId);
    }

    return updateDoc.series;
  }

  async filterPost(postId, ctx: ResolveContext) {
    
    
    // !== 로 하지말고 !=로 해야 지워진다.
    const filterPost = ctx.user.posts.filter((v) => v != postId);
    
    const updateDoc = await this.model.findByIdAndUpdate(
      ctx.user._id,
      {
        posts: filterPost,
      },
      { new: true }
    );
    
    if (updateDoc == null) {
      throw new IdNotFoundError(postId);
    }

    return updateDoc.posts;
  }

  async filterTeam(teamId, ctx: ResolveContext) {
    
    
    // !== 로 하지말고 !=로 해야 지워진다.
    const filterTeam = ctx.user.teams.filter((v) => v != teamId);
    
    const updateDoc = await this.model.findByIdAndUpdate(
      ctx.user._id,
      {
        teams: filterTeam,
      },
      { new: true }
    );
    
    if (updateDoc == null) {
      throw new IdNotFoundError(teamId);
    }

    return updateDoc.teams;
  }

  async filterSeries(seriesId, ctx: ResolveContext) {
    
    // !== 로 하지말고 !=로 해야 지워진다.
    const filterSeries = ctx.user.series.filter((v) => v != seriesId);
    
    const updateDoc = await this.model.findByIdAndUpdate(
      ctx.user._id,
      {
        series: filterSeries,
      },
      { new: true }
    );
    
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
      
      const user = await this.model
        .findById(userId)
        .populate({ path: "series" });
      
      return user;
    } catch (e) {
      throw new IdNotFoundError(userId);
    }
  }

  async getAllPostsByUser(page, userId) {
    try {
      
      const user = await this.model
        .findById(userId)
        .populate({ path: "posts" });
      
      return user;
    } catch (e) {
      throw new IdNotFoundError(userId);
    }
  }

  async getAllTeamsByUser(page, userId) {
    try {
      
      const user = await this.model
        .findById(userId)
        .populate({ path: "teams" })
        .sort({ createdAt: -1 })
        .exec();
      
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
      
      if (check.length > 0) return false;
      return true;
    } catch (e) {
      Log.error(e);
    }
  }
  async checkUniqueName(name: string) {
    try {
      const check = await this.model.find({ name }).lean().exec();
      
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
          
        }
        const setSkillSet = skillName.concat(`/${skillLevel}`);
        setSkillSetArray.push(setSkillSet);
      }
      
      return await this.tryUpdateById(ctx.user._id, {
        level: setSkillSetArray,
      });
    } catch (error) {
      Log.error(error);
    }
  }

  async plusRecommendPoint(userId, skill: string, point: number) {
    try {
      const user = await this.tryFindById(userId) as I.Maybe<UserType>
      
      const setRecommendSetArray = [];

      if (!user) return;
      
      for (const recommend of user.recommendPoint) {
        const recommendSet = recommend.split("/");
        const recommendName: string = recommendSet[0];
        let recommendLevel: number = parseInt(recommendSet[1], 10);

        if (recommendName === skill) {
          recommendLevel += point;
          
        }
        const setRecommendSet = recommendName.concat(`/${recommendLevel}`);
        setRecommendSetArray.push(setRecommendSet);
      }
      

      const updatedUser = await this.tryUpdateById(userId, {
        recommendPoint: setRecommendSetArray,
      });
      
      // 리프레시 토탈 포인트
      await this.refreshPoint(userId);
      
      return updatedUser;
    } catch (error) {
      Log.error(error);
    }
  }

  async plusPoint(userId, point: number) {
    try {
      const user = await this.tryFindById(userId) as I.Maybe<UserType>;

      if (!user) return;

      user.point += point;

      const updatedUser = await this.tryUpdateById(userId, {
        point: user.point,
       });
      // 리프레시 토탈 포인트
      this.refreshPoint(userId);
      
      return updatedUser;
    } catch (error) {
      Log.error(error);
    }
  }

  async refreshPoint(userId) {
    try {
      const user = await this.tryFindById(userId) as I.Maybe<UserType>
      
      if (!user) return;

      // 추천 기술 점수
      const totalRecommendPoint = await user.recommendPoint.map(v => parseInt(v.split("/")[1], 10))
        .reduce((sum, currValue) => sum + currValue * 1000, 0);
      
      // 기술 실력
      const totalLevelPoint = await user.level.map(v => parseInt(v.split("/")[1], 10))
        .reduce((sum, currValue) => sum + currValue * 100, 0);
      // 활동 점수

      const totalPoint = user.point + totalRecommendPoint + totalLevelPoint;

      

      const updatedUser = await this.tryUpdateById(userId, {
        totalPoint
      });

      return updatedUser;
    }
    catch (error) {
      Log.error(error);
    }
  }
}


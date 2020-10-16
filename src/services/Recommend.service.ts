import { RecommendType } from "./../models/Recommend";
import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { RecommendRepo } from "../repositorys/RecommendRepo";
import * as I from "../lib/helper/interfaces";
import { Recommend } from "../models/Recommend";
import { ResolveContext } from "../lib/graphql/resolve-context";
import { AddRecommendRequestType } from "../resolvers/recommend/dto/addRecommendRequestType";
import { Log } from "../lib/helper/debug";

@Service()
export class RecommendService extends BaseServiceMixin(RecommendRepo) {
  constructor(protected model = Recommend) {
    super(model);
  }

  async getAllRecommend(page, userId, skillName) {
    const recommends = this.getRecommendsBySkill(page, userId, skillName) as Promise<
      I.Maybe<{
        lastPage: string;
        docs: RecommendType[];
      }>
    >;
    console.log("recommends", recommends);
    return {
      lastPage: (await recommends).lastPage,
      posts: (await recommends).docs,
    };
  }

  
  async createRecommend(data: AddRecommendRequestType, ctx: ResolveContext) {
    try {
      return await this.model.create({
        ...data,
        recommendedBy: ctx.user._id,
      });
    } catch (e) {
      Log.error(e);
    }
  }

}

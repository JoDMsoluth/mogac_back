import { model } from 'mongoose';
import { GetAllRecommendResponseType } from "./dto/getAllRecommendResponseType";
import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation, Int, Ctx } from "type-graphql";
import { RecommendType } from "../../models/Recommend";
import { RecommendService } from "../../services/Recommend.service";
import { PaginateArgType } from "../common/PaginateArgType";
import { AddRecommendRequestType } from "./dto/addRecommendRequestType";
import { ResolveContext } from "../../lib/graphql/resolve-context";

@Resolver((of) => RecommendType)
export class RecommendResolver {
  constructor(
    // constructor injection of a service
    private readonly RecommendService: RecommendService
  ) {}

  @Query((_return) => GetAllRecommendResponseType)
  async getAllRecommends(
    @Arg("page", (_type) => Int) page: number,
    @Arg("skillName") skillName : string,
    @Ctx() ctx: ResolveContext
  ): Promise<I.Maybe<GetAllRecommendResponseType>> {
    return await this.RecommendService.getRecommendsBySkill(
      page,
      ctx.user._id,
      skillName
    );
  }
  
  @Mutation((_return) => RecommendType)
  async createRecommend(
    @Arg("data") data: AddRecommendRequestType,
    @Ctx() ctx: ResolveContext
  ): Promise<RecommendType> {
    //data 속에 seriesId가 들어갈 수 있다.
    console.log("user._id", ctx.user._id);
    if (ctx.user._id) {
      const reccomend = await this.RecommendService.createRecommend(data, ctx);
      return reccomend;
    }
  }

}

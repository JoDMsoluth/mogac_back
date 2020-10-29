import { NotificationService } from './../../services/Notification.service';
import { isValidObjectId, model } from 'mongoose';
import { GetAllRecommendResponseType } from "./dto/getAllRecommendResponseType";
import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation, Int, Ctx } from "type-graphql";
import { RecommendType } from "../../models/Recommend";
import { RecommendService } from "../../services/Recommend.service";
import { PaginateArgType } from "../common/PaginateArgType";
import { AddRecommendRequestType } from "./dto/addRecommendRequestType";
import { ResolveContext } from "../../lib/graphql/resolve-context";
import { UserService } from '../../services/Users.service';

@Resolver((of) => RecommendType)
export class RecommendResolver {
  constructor(
    // constructor injection of a service
    private readonly RecommendService: RecommendService,
    private readonly UserService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  @Query((_return) => GetAllRecommendResponseType)
  async getAllRecommends(
    @Arg("page", (_type) => Int) page: number,
    @Arg("skillName") skillName : string,
    @Arg("userId") userId : string,
  ): Promise<I.Maybe<GetAllRecommendResponseType>> {
    return await this.RecommendService.getRecommendsBySkill(
      page,
      userId,
      skillName
    );
  }
  
  @Mutation((_return) => RecommendType)
  async createRecommend(
    @Arg("data") data: AddRecommendRequestType,
    @Ctx() ctx: ResolveContext
  ): Promise<RecommendType> {
    //data 속에 seriesId가 들어갈 수 있다.
    

    if (ctx.user._id) {
      const recommend = await this.RecommendService.createRecommend(data, ctx);
      if (recommend) {
        const noti = await this.notificationService.create({
          url: `http://localhost:3000/blog?userId=${ctx.user._id}`,
          userId: data.userId,
          title: `기술추천`,
          contents: `${ctx.user.name}님의 기술추천`,
        });
        
        await this.UserService.plusRecommendPoint(data.userId, data.skillName,  1);
      }
      return recommend;
    }
  }
}

import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { SeriesType } from "../../models/Series";
import { SeriesService } from "../../services/Series.service";
import { GetAllSeriesResponseType } from "./dto/getAllSeriesResponseType";
import { PaginateArgType } from "../common/PaginateArgType";
import { AddSeriesRequestType } from "./dto/addSeriesRequestType";
import { UserService } from "../../services/Users.service";
import { ResolveContext } from "../../lib/graphql/resolve-context";

@Resolver((of) => SeriesType)
export class SeriesResolver {
  constructor(
    // constructor injection of a service
    private readonly SeriesService: SeriesService,
    private readonly UserService: UserService
  ) {}

  @Query((_return) => GetAllSeriesResponseType)
  async getAllSeries(
    @Arg("data") data: PaginateArgType
  ): Promise<I.Maybe<GetAllSeriesResponseType>> {
    // 최대 페이지, 현제 페이지 내용 받기
    return await this.SeriesService.getAllSeries(data);
  }

  @Mutation((_return) => SeriesType)
  async createSeries(
    @Arg("data") data: AddSeriesRequestType,
    @Ctx() ctx: ResolveContext
  ): Promise<SeriesType> {
    console.log("ctx", ctx);
    if (ctx.user._id) {
      const series = await this.SeriesService.createSeries(data, ctx);
      console.log("getsereis", series);
      await this.UserService.pushSeries(series.id, ctx);
      return series;
    }
  }
  @Mutation((_return) => SeriesType)
  async deleteSeries(
    @Arg("seriesId") seriesId: string,
    @Ctx() ctx: ResolveContext
  ): Promise<SeriesType> {
    await this.UserService.filterSeries(seriesId, ctx);
    return await this.SeriesService.deleteSeries(seriesId);
  }
}

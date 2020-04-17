import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg } from "type-graphql";
import { SeriesType } from "../../models/Series";
import { SeriesService } from "../../services/Series.service";
import { GetAllSeriesResponseType } from "./dto/getAllSeriesResponseType";
import { PaginateArgType } from "../common/PaginateArgType";

@Resolver((of) => SeriesType)
export class SeriesResolver {
  constructor(
    // constructor injection of a service
    private readonly SeriesService: SeriesService
  ) {}

  @Query((_return) => GetAllSeriesResponseType)
  async getAllSeries(
    @Arg("data") data: PaginateArgType
  ): Promise<I.Maybe<GetAllSeriesResponseType>> {
    // 최대 페이지, 현제 페이지 내용 받기
    return await this.SeriesService.getAllSeriess(data);
  }
}

import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { SeriesType, SeriesTryCrud, Series } from "../../models/Series";
import { AddSeriesRequestType } from "./addSeriesRequestType";

@Resolver()
export class SeriesResolver {
  // implements ResolverInterface<UserData> {

  // read series
  @Query((_returns) => SeriesType)
  async getSeries(@Arg("id") id: I.ObjectId) {
    return SeriesTryCrud.tryFindById(id);
  }

  // create series
  @Mutation((_type) => SeriesType)
  async createSeries(@Arg("req") signupData: AddSeriesRequestType) {
    return Series.create(signupData);
  }

  // update series
  @Mutation((_type) => SeriesType)
  async updateSeries(
    @Arg("id") id: I.ObjectId,
    @Arg("req", { nullable: true }) updateDate?: AddSeriesRequestType
  ) {
    return SeriesTryCrud.tryUpdateById(id, updateDate);
  }

  // delete series
  @Mutation((_type) => SeriesType)
  async deleteSeries(@Arg("id") id: I.ObjectId) {
    return SeriesTryCrud.tryDeleteById(id);
  }
}

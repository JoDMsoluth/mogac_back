import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { SeriesRepo } from "../repositorys/SeriesRepo";
import { Series, SeriesType } from "../models/Series";
import * as I from "../lib/helper/interfaces";
import { AddSeriesRequestType } from "../resolvers/series/dto/addSeriesRequestType";
import { UserService } from "./Users.service";
import { UserType } from "../models/Users";
import { IdNotFoundError } from "../repositorys/BaseRepo";
import { Ctx } from "type-graphql";
import { ResolveContext } from "../lib/graphql/resolve-context";
import { Log } from "../lib/helper/debug";

@Service()
export class SeriesService extends BaseServiceMixin(SeriesRepo) {
  constructor(protected model = Series) {
    super(model);
  }
  async createSeries(data: AddSeriesRequestType, ctx: ResolveContext) {
    try {
      return await this.model.create({ ...data, seriesBy: ctx.user._id });
    } catch (e) {
      Log.error(e);
    }
    return;
  }

  async deleteSeries(seriesId) {
    try {
      return await this.model.findByIdAndRemove(seriesId);
    } catch (e) {
      Log.error(e);
    }
    return;
  }

  async getAllSeries({ page, limit }) {
    const query = {};
    const series = this.getAll(page, limit, query) as Promise<
      I.Maybe<{
        lastPage: string;
        docs: SeriesType[];
      }>
    >;
    return { lastPage: (await series).lastPage, series: (await series).docs };
  }
}

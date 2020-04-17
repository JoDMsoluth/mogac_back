import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { SeriesRepo } from "../repositorys/SeriesRepo";
import { Series, SeriesType } from "../models/Series";
import * as I from "../lib/helper/interfaces";

@Service()
export class SeriesService extends BaseServiceMixin(SeriesRepo) {
  constructor(protected model = Series) {
    super(model);
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

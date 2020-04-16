import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { SeriesRepo } from "../repositorys/SeriesRepo";
import { Series } from "../models/Series";

@Service()
export class SeriesService extends BaseServiceMixin(SeriesRepo) {
  constructor(protected model = Series) {
    super(model);
  }
}

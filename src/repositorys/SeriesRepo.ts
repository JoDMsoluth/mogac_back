import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { SeriesModel, Series, SeriesData } from "../models/Series";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class SeriesRepo extends BaseRepo<SeriesModel> {
  protected readonly paginator = new Paginator<SeriesData, Series>({
    model: Series,
  });
}

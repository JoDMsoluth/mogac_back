import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { SeriesModel } from "../models/Series";

@Service()
export class SeriesRepo extends BaseRepo<SeriesModel> {}

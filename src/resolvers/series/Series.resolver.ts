import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { SeriesType } from "../../models/Series";
import { AddSeriesRequestType } from "./addSeriesRequestType";

import { updateSeriesRequestType } from "./updateSeriesRequestType";

import { SeriesService } from "../../services/Series.service";
import { Service } from "typedi";

@Resolver((of) => SeriesType)
export class SeriesResolver {}

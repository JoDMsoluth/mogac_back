import { Field, ObjectType } from "type-graphql";

import { SeriesType } from "../../../models/Series";

@ObjectType()
export class GetAllSeriesResponseType {
  @Field()
  lastPage!: string;

  @Field((_type) => [SeriesType])
  series!: SeriesType[];
}

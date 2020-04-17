import { Field, ObjectType } from "type-graphql";

import { TeamType } from "../../../models/Teams";

@ObjectType()
export class GetAllTeamResponseType {
  @Field()
  lastPage!: string;

  @Field((_type) => [TeamType])
  teams!: TeamType[];
}

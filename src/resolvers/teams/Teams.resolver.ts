import * as I from "../../lib/helper/interfaces";
import { User } from "../../models/Users";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { TeamType, TeamTryCrud, Team } from "../../models/Teams";
import { Service } from "typedi";

@Resolver((of) => TeamType)
export class TeamsResolver {
  // implements ResolverInterface<UserData> {
}

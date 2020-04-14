import * as I from "../../lib/helper/interfaces";
import { User } from "../../models/Users";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { TeamType, TeamTryCrud, Team } from "../../models/Teams";

@Resolver()
export class TeamsResolver {
  // implements ResolverInterface<UserData> {

  // read Teams
  @Query((_returns) => TeamType)
  async getTeams(@Arg("id") id: I.ObjectId) {
    return TeamTryCrud.tryFindById(id);
  }

  // create Teams
  @Mutation((_type) => TeamType)
  async createTeams(
    @Arg("adminId") adminId: I.ObjectId,
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("category") category: string
  ) {
    return Team.create({ title, description, adminId, category });
  }

  // update Teams
  @Mutation((_type) => TeamType)
  async updateTeams(
    @Arg("id") id: I.ObjectId,
    @Arg("title", { nullable: true }) title?: string,
    @Arg("description", { nullable: true }) description?: string,
    @Arg("category", { nullable: true }) category?: string
  ) {
    return TeamTryCrud.tryUpdateById(id, { title, description, category });
  }

  // delete Teams
  @Mutation((_type) => TeamType)
  async deleteTeams(@Arg("id") id: I.ObjectId) {
    return TeamTryCrud.tryDeleteById(id);
  }
}

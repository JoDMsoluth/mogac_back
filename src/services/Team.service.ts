import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { TeamRepo } from "../repositorys/TeamRepo";
import { Team, TeamType } from "../models/Teams";
import * as I from "../lib/helper/interfaces";

@Service()
export class TeamService extends BaseServiceMixin(TeamRepo) {
  constructor(protected model = Team) {
    super(model);
  }

  async getAllTeams({ page, limit }) {
    const query = {};
    const teams = this.getAll(page, limit, query) as Promise<
      I.Maybe<{
        lastPage: string;
        docs: TeamType[];
      }>
    >;
    return { lastPage: (await teams).lastPage, teams: (await teams).docs };
  }
  async getFilterTeams({ page, category = null, location = null, limit }) {
    console.log(category, location);
    let query = null;
    if (category && location) {
      query = { category, location };
    } else query = { $or: [{ category: category }, { location: location }] };

    const teams = this.getAll(page, limit, query) as Promise<
      I.Maybe<{
        lastPage: string;
        docs: TeamType[];
      }>
    >;
    return { lastPage: (await teams).lastPage, teams: (await teams).docs };
  }
}

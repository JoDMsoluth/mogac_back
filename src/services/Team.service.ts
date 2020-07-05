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

  async addBlackList(userId, teamId) {
    const getTeam = (await this.tryFindById(teamId)) as I.Maybe<TeamType>;
    if (!getTeam.blackList.includes(userId)) {
      getTeam.blackList.push(userId);
      return await this.tryUpdateById(teamId, {
        blackList: getTeam.blackList,
      });
    }
    return getTeam;
  }

  async filterBlackList(userId, teamId) {
    const getTeam = (await this.tryFindById(teamId)) as I.Maybe<TeamType>;
    if (getTeam && getTeam.blackList.includes(userId)) {
      getTeam.blackList.filter((id) => id !== userId);
      return await this.tryUpdateById(teamId, {
        blackList: getTeam.blackList,
      });
    }
    return getTeam;
  }

  async addChatData(chatData, teamId) {
    const getTeam = (await this.tryFindById(teamId)) as I.Maybe<TeamType>;
    if (getTeam) {
      getTeam.chatData.push(chatData);
      return await this.tryUpdateById(teamId, {
        chatData: getTeam.chatData,
      });
    }
  }
}

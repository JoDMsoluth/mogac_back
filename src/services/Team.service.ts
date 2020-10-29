import { AddTeamRequestType } from "./../resolvers/teams/dto/addTeamRequestType";
import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { TeamRepo } from "../repositorys/TeamRepo";
import { Team, TeamType } from "../models/Teams";
import * as I from "../lib/helper/interfaces";
import { ResolveContext } from "../lib/graphql/resolve-context";
import { Log } from "../lib/helper/debug";
import { IdNotFoundError } from "../repositorys/BaseRepo";

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

  async createTeam(data: AddTeamRequestType, ctx: ResolveContext) {
    try {
      return await this.model.create({ ...data, adminId: ctx.user._id, adminName : ctx.user.name, adminEmail : ctx.user.email });
    } catch (e) {
      Log.error(e);
    }
    return;
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

  async getAllTeamsByUser(ctx: ResolveContext) {
    try {
      
      return await this.model.find({ adminId: ctx.user._id });
    } catch (e) {
      Log.error(e);
    }
    return;
  }

  async pushTeamUser(userId: I.ObjectId, teamId) {
    const getTeam = (await this.tryFindById(teamId)) as I.Maybe<TeamType>;
    if (getTeam) {
      if (!getTeam.users.includes(userId.toHexString()))
        getTeam.users.push(userId.toHexString());
      const updateDoc = (await this.tryUpdateById(teamId, getTeam)) as I.Maybe<
        TeamType
      >;
      
      return updateDoc;
    } else {
      throw new IdNotFoundError(teamId);
    }
  }

  async filterTeamUser(userId, teamId) {
    const getTeam = (await this.tryFindById(teamId)) as I.Maybe<TeamType>;
    if (getTeam && getTeam.users.includes(userId)) {
      const filteredUsers = getTeam.users.filter((v) => v != userId);
      const updateDoc = (await this.tryUpdateById(teamId, {
        users: filteredUsers,
      })) as I.Maybe<TeamType>;
      
      return updateDoc;
    } else {
      throw new IdNotFoundError(teamId);
    }
  }
}

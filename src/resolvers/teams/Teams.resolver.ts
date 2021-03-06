import { NotificationService } from "./../../services/Notification.service";
import { AddTeamRequestType } from "./dto/addTeamRequestType";
import * as I from "../../lib/helper/interfaces";
import { User } from "../../models/Users";
import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { TeamType, Team } from "../../models/Teams";
import { GetAllTeamResponseType } from "./dto/getAllTeamResponsetype";
import {
  PaginateArgType,
  FilterPaginateArgType,
} from "../common/PaginateArgType";
import { TeamService } from "../../services/Team.service";
import { ResolveContext } from "../../lib/graphql/resolve-context";
import { UserService } from "../../services/Users.service";

@Resolver((of) => TeamType)
export class TeamsResolver {
  constructor(
    // constructor injection of a service
    private readonly teamService: TeamService,
    private readonly UserService: UserService,
    private readonly notificationService: NotificationService
  ) {}

  @Query((_return) => GetAllTeamResponseType)
  async getAllTeam(
    @Arg("data") data: PaginateArgType
  ): Promise<I.Maybe<GetAllTeamResponseType>> {
    // 최대 페이지, 현제 페이지 내용 받기
    return await this.teamService.getAllTeams(data);
  }

  @Query((_return) => GetAllTeamResponseType)
  async getFilterTeam(
    @Arg("data") data: FilterPaginateArgType
  ): Promise<I.Maybe<GetAllTeamResponseType>> {
    // 최대 페이지, 현제 페이지 내용 받기
    return await this.teamService.getFilterTeams(data);
  }

  @Query(() => TeamType)
  async getTeamById(@Arg("teamId") teamId: I.ObjectId) {
    const result = this.teamService.tryFindById(teamId);
    return result;
  }

  @Query(() => [TeamType])
  async getAllTeamsByMe(@Ctx() ctx: ResolveContext) {
    const result = this.teamService.getAllTeamsByUser(ctx);
    return result;
  }

  @Mutation((_return) => TeamType)
  async createTeam(
    @Arg("data") data: AddTeamRequestType,
    @Ctx() ctx: ResolveContext
  ): Promise<TeamType> {
    
    if (ctx.user._id) {
      const team = await this.teamService.createTeam(data, ctx);
      
      await this.UserService.pushTeam(team._id, ctx.user._id);
      return team;
    }
  }

  @Mutation((_return) => TeamType)
  async inviteUserToTeam(
    @Arg("userId") userId: I.ObjectId,
    @Arg("teamId") teamId: I.ObjectId
  ): Promise<TeamType> {
    const team = await this.teamService.pushTeamUser(userId, teamId);
    await this.UserService.pushTeam(team._id, userId);
    await this.notificationService.create({
      url: `http://localhost:3000/team`,
      userId: userId.toHexString(),
      title: "팀초대",
      contents: "팀 초대 받았습니다.",
    });
    

    return team;
  }

  @Mutation((_return) => TeamType)
  async KickUserOutTeam(
    @Arg("userId") userId: string,
    @Arg("teamId") teamId: string
  ): Promise<TeamType> {
    const team = await this.teamService.filterTeamUser(userId, teamId);
    
    return team;
  }

  @Mutation(() => TeamType)
  async addBlackList(
    @Arg("userId") userId: string,
    @Arg("teamId") teamId: string
  ) {
    const result = this.teamService.addBlackList(userId, teamId);
    return result;
  }

  @Mutation(() => TeamType)
  async addChatData(
    @Arg("chat") chat: string,
    @Arg("teamId") teamId: I.ObjectId,
    @Ctx() ctx: ResolveContext
  ) {
    if (ctx.user) {
      const chatData = `${ctx.user.name}/${Date.now()}/${chat}`;
      const result = this.teamService.addChatData(chatData, teamId);
      return result;
    }
  }
}

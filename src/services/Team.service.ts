import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { TeamRepo } from "../repositorys/TeamRepo";
import { Team } from "../models/Teams";

@Service()
export class TeamService extends BaseServiceMixin(TeamRepo) {
  constructor(protected model = Team) {
    super(model);
  }

  async login() {}

  async logout() {}
}

import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { TeamModel, Team, TeamData } from "../models/Teams";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class TeamRepo extends BaseRepo<TeamModel> {
  protected readonly paginator = new Paginator<TeamData, Team>({ model: Team });
}

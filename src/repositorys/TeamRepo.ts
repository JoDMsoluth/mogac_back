import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { TeamModel } from "../models/Teams";

@Service()
export class TeamRepo extends BaseRepo<TeamModel> {}

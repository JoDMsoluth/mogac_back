import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { SkillSetModel, SkillSetData, SkillSet } from "../models/SkillSet";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class SkillSetRepo extends BaseRepo<SkillSetModel> {
  protected readonly paginator = new Paginator<SkillSetData, SkillSet>({
    model: SkillSet,
  });
}

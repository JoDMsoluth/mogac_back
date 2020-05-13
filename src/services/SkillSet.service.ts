import { Service, Inject } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { SkillSetRepo } from "../repositorys/SkillSetRepo";
import { SkillSet } from "../models/SkillSet";
import { Log } from "../lib/helper/debug";

@Service()
export class SkillSetService extends BaseServiceMixin(SkillSetRepo) {
  constructor(protected model = SkillSet) {
    super(model);
  }
  async createSkillSet(skill) {
    try {
      return await this.model.create({ skill, level: 0 });
    } catch (e) {
      Log.error(e);
    }
    return;
  }

  async deleteSkillSet() {}
}

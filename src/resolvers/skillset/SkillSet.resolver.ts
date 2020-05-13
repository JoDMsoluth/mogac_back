import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { SkillSetType } from "../../models/SkillSet";
import { SkillSetService } from "../../services/SkillSet.service";
import { PaginateArgType } from "../common/PaginateArgType";
import { AddSkillSetRequestType } from "./dto/addSkillSetRequestType";
import { CategoryService } from "../../services/Category.service";
import { CategoryType } from "../../models/Category";
import mongoose from "../../models";

@Resolver((of) => SkillSetType)
export class SkillSetResolver {
  constructor(
    // constructor injection of a service
    private readonly SkillSetService: SkillSetService,
    private readonly CategoryService: CategoryService
  ) {}

  @Mutation((_type) => SkillSetType)
  async createSkillSet(
    @Arg("categoryId") categoryId: I.ObjectId,
    @Arg("skill") skill: string
  ): Promise<SkillSetType> {
    const skillset = await this.SkillSetService.createSkillSet(skill);
    await this.CategoryService.pushSkill({
      categoryId,
      skillSetId: skillset.id,
    });
    return skillset;
  }
}

import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CategoryType } from "../../models/Category";
import { CategoryService } from "../../services/Category.service";
import { createSkillSetRequestType } from "./dto/createSkillSetRequestType";
import { SkillType } from "../../models/type/Skill";

@Resolver((of) => CategoryType)
export class CategoryResolver {
  constructor(
    // constructor injection of a service
    private readonly CategoryService: CategoryService
  ) {}

  @Mutation((_type) => [SkillType])
  async createSkillSet(
    @Arg("data", () => createSkillSetRequestType) data: any
  ) {
    return this.CategoryService.pushSkill(data);
  }

  @Mutation((_type) => [SkillType])
  async deleteSkillSet(
    @Arg("categoryName") categoryName: string,
    @Arg("skill") skill: string
  ) {
    return this.CategoryService.filterSkill({ categoryName, skill });
  }

  @Query((_return) => [CategoryType])
  async getAllCategory() {
    return await this.CategoryService.getAllCategory();
  }
}

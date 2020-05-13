import * as I from "../../lib/helper/interfaces";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CategoryType } from "../../models/Category";
import { CategoryService } from "../../services/Category.service";

@Resolver((of) => CategoryType)
export class CategoryResolver {
  constructor(
    // constructor injection of a service
    private readonly CategoryService: CategoryService
  ) {}

  @Query((_return) => [CategoryType])
  async getAllCategory() {
    return await this.CategoryService.getAllCategory();
  }
}

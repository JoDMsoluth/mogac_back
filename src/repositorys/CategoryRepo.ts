import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { CategoryModel, CategoryData, Category } from "../models/Category";

@Service()
export class CategoryRepo extends BaseRepo<CategoryModel> {
  constructor(protected model = Category) {
    super(model);
  }

  protected readonly paginator = new Paginator<CategoryData, Category>({
    model: Category,
  });
}

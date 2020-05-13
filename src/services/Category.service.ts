import { Service } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { CategoryRepo } from "../repositorys/CategoryRepo";
import { Category, CategoryType, CategoryModel } from "../models/Category";
import * as I from "../lib/helper/interfaces";
import { ISkillSet, SkillSetType } from "../models/SkillSet";
import { Log } from "../lib/helper/debug";
import { IdNotFoundError } from "../repositorys/BaseRepo";

@Service()
export class CategoryService extends BaseServiceMixin(CategoryRepo) {
  constructor(protected model = Category) {
    super(model);
  }

  async getAllCategory() {
    const categorys = this.model.find().catch((err) => Log.error(err));
    return categorys;
  }

  async pushSkill({ categoryId, skillSetId }) {
    const category = (await this.tryFindById(categoryId)) as I.Maybe<
      CategoryType
    >;
    if (!category) return;

    category.skillset.push(skillSetId);

    const updateDoc = await this.model.findByIdAndUpdate(
      categoryId,
      {
        skillset: category.skillset,
      },
      { new: true }
    );
    console.log("updateDoc", updateDoc);
    if (updateDoc == null) {
      throw new IdNotFoundError(categoryId);
    }

    return updateDoc.skillset;
  }
}

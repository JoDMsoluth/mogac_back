import { Service } from "typedi";
import BaseServiceMixin from "./BaseServiceMixin";
import { CategoryRepo } from "../repositorys/CategoryRepo";
import { Category, CategoryType, CategoryModel } from "../models/Category";
import * as I from "../lib/helper/interfaces";
import { ISkill } from "../models/type/Skill";
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

  async pushSkill({ categoryName, skill }) {
    const findQuery = { name: categoryName };
    const category = (await this.tryFindOne(findQuery)) as I.Maybe<
      CategoryType
    >;
    if (!category) return;

    const pushingSkillSet = {
      skill,
      level: 0,
    } as ISkill;
    console.log("category", category);
    category.skillset.push(pushingSkillSet);

    const updateDoc = await this.model.findOneAndUpdate(
      findQuery,
      {
        skillset: category.skillset,
      },
      { new: true }
    );
    console.log("updateDoc", updateDoc);
    if (updateDoc == null) {
      throw new IdNotFoundError(categoryName);
    }

    return updateDoc.skillset;
  }

  async filterSkill({ categoryName, skill }) {
    const findQuery = { name: categoryName };
    const category = (await this.tryFindOne(findQuery)) as I.Maybe<
      CategoryType
    >;

    console.log("category", category);
    const removedSkillSet = category.skillset.filter((v) => v.skill !== skill);
    const updateDoc = await this.model.findOneAndUpdate(
      findQuery,
      {
        skillset: removedSkillSet,
      },
      { new: true }
    );
    console.log("updateDoc", updateDoc);
    if (updateDoc == null) {
      throw new IdNotFoundError(categoryName);
    }
    return updateDoc.skillset;
  }
}

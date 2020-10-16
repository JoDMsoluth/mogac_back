import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { RecommendModel, RecommendData, Recommend } from "../models/Recommend";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class RecommendRepo extends BaseRepo<RecommendModel> {
  protected readonly paginator = new Paginator<RecommendData, Recommend>({
    model: Recommend,
  });

  async getRecommendsBySkill(page, userId, skillName) {
    const docs = (await this.model
      .find({ userId : userId.toString(), skillName })
      .populate({ path: "recommendedBy" })
      .sort({ createdAt: -1 })
      // .limit(9)
      // .skip((page - 1) * 9)
      .lean()
      .exec()) as any;

    const totalDoc: number = await this.model.find().count();
    const lastPage: string = Math.ceil(totalDoc / 9).toString();
    return { lastPage, docs };
  }
}

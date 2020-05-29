import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { PostModel, PostData, Post } from "../models/Posts";
import { Paginator } from "../lib/mongoose-utils/paginate";

@Service()
export class PostRepo extends BaseRepo<PostModel> {
  protected readonly paginator = new Paginator<PostData, Post>({ model: Post });

  async getPostsByPage(page) {
    const docs = await this.model
      .find()
      .populate({ path: "postedBy" })
      .sort({ likes: -1 })
      .limit(9)
      .skip((page - 1) * 9)
      .lean()
      .exec();

    const totalDoc: number = await this.model.find().count();
    const lastPage: string = Math.ceil(totalDoc / 9).toString();
    return { lastPage, docs };
  }
}

import { Service } from "typedi";
import { BaseRepo, IdNotFoundError } from "./BaseRepo";
import { PostModel, PostData, Post, PostType } from "../models/Posts";
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

  async getPostsByQuery(page, query) {
    const docs = await this.model
      .find(query)
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

  async getPostForView(postId: string) {
    const doc = await this.model
      .findById(postId)
      .populate([
        { path: "followUser", select: "_id" },
        { path: "postedBy", select: "_id name image_url" },
        { path: "series" },
      ]);
    console.log("get post", doc);
    return doc;
  }

  async pushComment(postId, commentId) {
    console.log("comments, post", commentId, postId);
    const post = (await this.tryFindById(postId)) as PostType;
    console.log("post", post);
    post.comments.push(commentId);
    console.log("post.comments", post.comments);
    const updateDoc = await this.model.findByIdAndUpdate(
      postId,
      {
        comments: post.comments,
      },
      { new: true }
    );
    console.log("updateDoc", updateDoc);
    if (updateDoc == null) {
      throw new IdNotFoundError(postId);
    }

    return updateDoc.comments;
  }

  async filterComment(postId, commentId) {
    // !== 로 하지말고 !=로 해야 지워진다.
    const post = (await this.tryFindById(postId)) as PostType;
    const filterComment = post.comments.filter((v) => v != commentId);

    const updateDoc = await this.model.findByIdAndUpdate(
      postId,
      {
        comments: filterComment,
      },
      { new: true }
    );
    if (updateDoc == null) {
      throw new IdNotFoundError(postId);
    }

    return updateDoc.comments;
  }
}

import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { PostModel } from "../models/Posts";

@Service()
export class PostRepo extends BaseRepo<PostModel> {}

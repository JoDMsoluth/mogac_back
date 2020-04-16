import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { CommentModel } from "../models/Comments";

@Service()
export class CommentRepo extends BaseRepo<CommentModel> {}

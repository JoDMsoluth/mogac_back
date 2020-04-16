import { Service } from "typedi";
import { BaseRepo } from "./BaseRepo";
import { UserModel } from "../models/Users";

@Service()
export class UserRepo extends BaseRepo<UserModel> {}

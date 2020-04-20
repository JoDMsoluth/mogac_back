import * as Express from "express";
import * as I from "../helper/interfaces";
import { User } from "../../models/Users";
import { authenticateJWT } from "../helper/authentication";

export interface ResolveContext {
  user?: I.Maybe<User>;
  res: Express.Response;
  req: Express.Request;
}

export interface ResolveContextFactoryOptions {
  req: Express.Request;
  res: Express.Response;
}

export async function makeContext({
  req,
  res,
}: ResolveContextFactoryOptions): Promise<ResolveContext> {
  return { user: await authenticateJWT(req), res, req };
}

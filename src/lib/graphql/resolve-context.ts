import * as Express from "express";
import * as I from "../helper/interfaces";
import { User } from "../../models/Users";
import { authenticateJWT } from "../helper/authentication";

export interface ResolveContext {
  user?: I.Maybe<User>;
}

export interface ResolveContextFactoryOptions {
  req: Express.Request;
}

export async function makeContext({
  req,
}: ResolveContextFactoryOptions): Promise<ResolveContext> {
  return { user: await authenticateJWT(req) };
}

import * as I from "../../lib/helper/interfaces";
import { User, UserType } from "../../models/Users";

import { Resolver, Arg, Mutation, Ctx, Query } from "type-graphql";
import { LoginRequestType } from "./loginRequestType";
import { LoginResponseType } from "./loginResponseType";
import { nullable } from "../../lib/helper/flags";
import { ResolveContext } from "../../lib/graphql/resolve-context";
import { Log } from "../../lib/helper/debug";
import passport = require("passport");

@Resolver()
export class AuthResolver {
  @Query((_type) => UserType)
  async getCurrentUser(@Ctx() ctx: ResolveContext) {
    console.log("ctx.user", ctx.user);
    return ctx.user;
  }

  @Mutation((_type) => LoginResponseType, { nullable })
  async login(
    @Arg("req") credentials: LoginRequestType
  ): Promise<I.Maybe<LoginResponseType>> {
    const user = await User.findByCredentials(credentials);
    //if (!user.comfirmed) return null;
    return user == null ? null : { jwt: user.makeJWT(), user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: ResolveContext) {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          Log.error(err);
          return rej(false);
        }
        ctx.res.clearCookie("qid");
        return res(true);
      })
    );
  }
}

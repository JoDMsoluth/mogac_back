import * as I from "../../lib/helper/interfaces";
import { User } from "../../models/Users";

import { Resolver, Arg, Mutation } from "type-graphql";
import { LoginRequestType } from "./loginRequestType";
import { LoginResponseType } from "./loginResponseType";
import { nullable } from "../../lib/helper/flags";

@Resolver()
export class AuthResolver {
  @Mutation((_type) => LoginResponseType, { nullable })
  async login(
    @Arg("req") credentials: LoginRequestType
  ): Promise<I.Maybe<LoginResponseType>> {
    const user = await User.findByCredentials(credentials);

    return user == null ? null : { jwt: user.makeJWT(), user };
  }
}

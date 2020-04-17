import * as Passport from "passport";
import * as Express from "express";
import * as Vts from "vee-type-safe";
import * as I from "./interfaces";
import { ForbiddenError } from "./statused-error";

import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import * as Config from "../../configs";
import { User } from "../../models/Users";
import { UserRepo } from "../../repositorys/UserRepo";

Passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Config.JWT.KeyPair.public_key,
    },
    async (untrustedJwtPayload: unknown, done) => {
      const mismatch = Vts.mismatch(untrustedJwtPayload, I.JWT.PayloadTD);
      if (mismatch != null) {
        return done(
          new ForbiddenError(`invalid jwt, ${mismatch.toErrorString()}`)
        );
      }
      const jwtPayload = untrustedJwtPayload as I.JWT.Payload;
      const model = new UserRepo();
      return model
        .tryFindById(new I.ObjectId(jwtPayload.sub))
        .then((user) => done(null, user))
        .catch(done);
    }
  )
);

export async function authenticateJWT(req: Express.Request) {
  return req.headers.authorization == null
    ? null
    : new Promise<I.Maybe<User>>((resolve, reject) =>
        Passport.authenticate(
          "jwt",
          { session: false },
          (err, user?: I.Maybe<User>) => {
            return err != null ? reject(err) : resolve(user);
          }
        )(req)
      );
}

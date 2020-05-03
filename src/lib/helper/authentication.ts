import * as Passport from "passport";
import * as Express from "express";
import * as Vts from "vee-type-safe";
import * as I from "./interfaces";
import { ForbiddenError } from "./statused-error";

import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

import * as Config from "../../configs";
import { User, UserModel, UserType } from "../../models/Users";
import { UserRepo } from "../../repositorys/UserRepo";

Passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Config.JWT.KeyPair.public_key,
    },
    // ex ) Bearer Token
    async (untrustedJwtPayload: unknown, done) => {
      const mismatch = Vts.mismatch(untrustedJwtPayload, I.JWT.PayloadTD);
      if (mismatch == null) {
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
// 유저라 로그인 했을 때 (에러가 날경우, 해당계정없음, 비밀번호 부적합, 로그인 성공)에 대한 처리

Passport.serializeUser(function (user: UserType, done) {
  done(null, user.id);
});
// user ID를 클라이언트한테 쿠키로 보내기 설정

Passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
// 쿠키로 인증 성공/실패시 처리

import * as dotenv from "dotenv";
// config() will read your .env file, parse the contents, assign it to process.env.

import * as Utils from "../lib/helper/utils";
import * as path from "path";
import pair from "../lib/helper/rsa";
import { Algorithm } from "jsonwebtoken";

dotenv.config();

function pathFromRoot(relativePath: string) {
  return path.normalize(path.join(__dirname, "../../", relativePath));
}

export const PasswordSalt = Utils.tryReadEnv("PASSWORD_SALT");
export const Port = Utils.tryReadEnv("PORT");
export const DatabaseUrl = Utils.tryReadEnv("DATABASE_URL");

export const Frontend = {
  DistDir: pathFromRoot("dist"),
  AssetsDir: pathFromRoot("assets"),
  IndexHtmlPath: pathFromRoot("dist/index.html"),
};

export const JWT = {
  // expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
  ExpirationTime: "7d",
  EncodingAlgorithm: "RS256" as Algorithm,
  KeyPair: pair,
};

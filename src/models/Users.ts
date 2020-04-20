import * as Config from "../configs";
import * as Crypto from "crypto";
import * as Utils from "../lib/helper/utils";
import * as I from "../lib/helper/interfaces";
import * as JWT from "jsonwebtoken";

import {
  Typegoose,
  prop,
  staticMethod,
  instanceMethod,
  pre,
  arrayProp,
  Ref,
} from "@hasezoey/typegoose";
import { Field, ObjectType, registerEnumType, Int, Float } from "type-graphql";
import { index, unique } from "../lib/helper/flags";
import { Paginator } from "../lib/mongoose-utils/paginate";
import { IntegerRange } from "../lib/helper/integer-range";
import { PostType } from "./Posts";
import { TeamType } from "./Teams";

export namespace UserPropLimits {
  export const EmailLength = new IntegerRange(5, 50);
  export const PasswordLength = new IntegerRange(6, 30);
  export const NameLength = new IntegerRange(2, 20);
  export const PhoneLength = new IntegerRange(10, 20);
  export const AddressLength = new IntegerRange(15, 255);
  export const BirthLength = new IntegerRange(4, 13);
  export const ImageUrlLength = new IntegerRange(3, 255);
}

export enum UserRole {
  Admin = "admin",
  Guest = "guest",
  Regular = "regular",
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "Identifies user access level",
});

export interface Credentials {
  email: string;
  password: string;
}

export interface IUser extends Credentials {
  id: I.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  phone: string;
  address: string;
  image_url: string;
  point: number;
  level: number;
  check_Found: boolean;
  comfirmed: boolean;
  position: number[];
  favorites: string[];
  friendsId: any[];
  blackListId: any[];
  posts: any[];
  likePostsId: any[];
  teams: any[];
  role: UserRole;
  jwt: string;
}

@pre<UserType>("save", function (next: CallableFunction) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = UserType.encodePassword(this.password);
  next();
})
@ObjectType("User")
export class UserType extends Typegoose implements IUser {
  @Field()
  @prop()
  get id(this: User): I.ObjectId {
    return this._id;
  }

  @Field((_type) => Date)
  @prop({ default: Date.now })
  createdAt: Date;

  @Field((_type) => Date)
  @prop({ default: Date.now })
  updatedAt: Date;

  @Field()
  @prop({ required: true, index, unique })
  email!: string;

  @Field()
  @prop({ required: true })
  password!: string; // do not expose password as public GraphQL field

  @Field()
  @prop({ required: true })
  name!: string;

  @Field()
  @prop({ required: true })
  phone!: string;

  @Field()
  @prop({ required: true })
  address!: string;

  @Field()
  @prop({ required: true })
  birth!: string;

  @Field()
  @prop()
  image_url: string;

  @Field(() => Int)
  @prop()
  point: number;

  @Field(() => Int)
  @prop()
  level: number;

  @Field(() => Boolean)
  @prop({ default: true })
  check_Found: boolean;

  @Field(() => Boolean)
  @prop({ default: false })
  comfirmed: boolean;

  @Field(() => [Float])
  @arrayProp({ items: String })
  position: number[];

  @Field(() => [String])
  @arrayProp({ items: String })
  favorites: string[];

  @Field((_type) => [String])
  @arrayProp({ itemsRef: "UserType" })
  friendsId: Ref<UserType>[];

  @Field((_type) => [String])
  @arrayProp({ itemsRef: "UserType" })
  blackListId: Ref<UserType>[];

  @Field((_type) => [String])
  @arrayProp({ itemsRef: "UserType" })
  likePostsId: Ref<UserType>[];

  @Field((_type) => [String])
  @arrayProp({ itemsRef: "PostType" })
  posts: Ref<PostType>[];

  @Field((_type) => [String])
  @arrayProp({ itemsRef: "TeamType" })
  teams: Ref<TeamType>[];

  @Field()
  @prop()
  jwt: string;

  @Field((_type) => UserRole) // must be explicitly forwarded when using enums
  @prop({
    required: true,
    enum: Object.values(UserRole),
    default: UserRole.Regular,
  })
  role!: UserRole;

  /**
   * Searches for `User` with the given `email` and `password`. Password is
   * automatically encoded before being propagated to the mongoose.
   *
   * @param email Target user email.
   * @param password Raw target user password.
   *
   */
  @staticMethod
  static async findByCredentials(
    this: UserModel,
    { email, password }: Credentials
  ) {
    return User.findOne({
      email,
      password: this.encodePassword(password),
    });
  }

  /**
   * Returns a hash-encoded representation of password to store in the database.
   * @param password Real password to be encoded.
   */
  @staticMethod
  public static encodePassword(password: string) {
    const hash = Crypto.createHmac("sha512", Config.PasswordSalt);
    hash.update(password);
    return hash.digest("hex");
  }

  @instanceMethod
  makeJWT(this: User) {
    const customPayload: I.JWT.Payload = {
      sub: String(this._id),
    };
    return JWT.sign(customPayload, Config.JWT.KeyPair.private_key, {
      expiresIn: Config.JWT.ExpirationTime,
      algorithm: Config.JWT.EncodingAlgorithm,
    });
  }
}

export const User = Utils.getModelFromTypegoose(UserType);
export const UserPaginator = new Paginator<UserData, User>({ model: User });

export type User = InstanceType<UserModel>;
export type UserModel = typeof User;
export type UserData = I.TypegooseDocProps<UserType>;

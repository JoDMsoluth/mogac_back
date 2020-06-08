import * as I from "../../lib/helper/interfaces";
import { UserType } from "../../models/Users";
import { Resolver, Query, Arg, Ctx, Mutation, Int, Float } from "type-graphql";
import { UserService } from "../../services/Users.service";
import { Service } from "typedi";
import { PaginateArgType } from "../common/PaginateArgType";
import { ResolveContext } from "../../lib/graphql/resolve-context";
import { GetAllUserResponseType } from "./dto/getAllUserResponseType";
import { GraphQLUpload } from "apollo-server-express";
import { Upload, UploadResponse } from "../../lib/helper/interfaces";
import { createWriteStream } from "fs";
import { AWSS3Uploader } from "../../lib/helper/AWSS3Uploader";
import { UploadResponseType } from "./dto/uploadType";
import { SeriesType } from "../../models/Series";
import { Log } from "../../lib/helper/debug";
import { IdNotFoundError } from "../../repositorys/BaseRepo";

@Service()
@Resolver((of) => UserType)
export class UserResolver {
  constructor(
    // constructor injection of a service
    private readonly userService: UserService,
    private readonly AWSS3Uploader: AWSS3Uploader
  ) {}

  @Query((_return) => GetAllUserResponseType)
  async getAllUser(
    @Arg("data") data: PaginateArgType
  ): Promise<I.Maybe<GetAllUserResponseType>> {
    // 최대 페이지, 현제 페이지 내용 받기
    return await this.userService.getAllUsers(data);
  }

  @Query((_return) => UserType)
  async getAllSeriesByUser(@Ctx() ctx: ResolveContext) {
    console.log("seriesId", ctx.user.series[0]);
    return await this.userService.getAllSeriesByUser(ctx.user._id);
  }

  @Query((_return) => [UserType])
  async getUsersByTeam(
    @Arg("id") id: I.ObjectId,
    @Arg("data") data: PaginateArgType
  ) {
    return this.userService.getAllUsersByTeam(id, data);
  }

  @Query((_return) => UserType)
  async getAllPostsForPostView(@Arg("name") name: string) {
    return this.userService.getPostsByNameForPostView(name);
  }

  // 매칭된 유저검색
  @Query((_return) => [UserType])
  async getAllUserBySearch(
    @Arg("ableLocation", (_type) => [String]) ableLocation: string[],
    @Arg("ableSkillSet", (_type) => [String]) ableSkillSet: string[]
  ) {
    return this.userService.getUsersByMatching(ableLocation, ableSkillSet);
  }

  @Mutation(() => UploadResponseType)
  async uploadProfileImage(
    @Arg("file", () => GraphQLUpload) file: Upload
  ): Promise<UploadResponseType> {
    console.log("upload params", file);
    const result = this.AWSS3Uploader.uploadSingleImage({ file });
    console.log("result", result);
    return result;
  }

  @Mutation(() => UserType)
  async updateUserPosition(
    @Arg("position", () => [Float]) position: number[],
    @Ctx() ctx: ResolveContext
  ) {
    const result = this.userService.updatePosition(position, ctx);
    console.log("updatePosition Result");
    return result;
  }
}

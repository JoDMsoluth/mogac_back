import { Service } from "typedi";
import { Resolver, Query, Arg } from "type-graphql";
import { UserType } from "../../models/Users";
import { TeamType } from "../../models/Teams";
import { PostType } from "../../models/Posts";
import { UserService } from "../../services/Users.service";
import { PostService } from "../../services/post.service";
import { TeamService } from "../../services/Team.service";
import * as I from "../../lib/helper/interfaces";
import { GetAllUserResponseType } from "../users/dto/getAllUserResponseType";
import { GetAllTeamResponseType } from "../teams/dto/getAllTeamResponsetype";
import { GetAllPostResponseType } from "../post/dto/getAllPostResponseType";

@Service()
@Resolver()
export class SearchResolver {
  constructor(
    // constructor injection of a service
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly teamService: TeamService
  ) {}
  @Query((_type) => GetAllUserResponseType)
  async totalSearchUser(
    @Arg("searchWord") searchWord: string,
    @Arg("page") page: number
  ) {
    const query = {
      name: { $regex: new RegExp(".*" + searchWord + ".*", "i") },
    };
    const result = (await this.userService.getAll(page, 9, query)) as I.Maybe<{
      lastPage: string;
      docs: UserType[];
    }>;
    return { lastPage: result.lastPage, users: result.docs };
  }

  @Query((_type) => GetAllPostResponseType)
  async totalSearchPost(
    @Arg("searchWord") searchWord: string,
    @Arg("page") page: number
  ) {
    const query = {
      title: { $regex: new RegExp(".*" + searchWord + ".*", "i") },
    };
    const result = (await this.postService.getPostsByQuery(
      page,
      query
    )) as I.Maybe<{
      lastPage: string;
      docs: PostType[];
    }>;
    return { lastPage: result.lastPage, posts: result.docs };
  }

  @Query((_type) => GetAllTeamResponseType)
  async totalSearchTeam(
    @Arg("searchWord") searchWord: string,
    @Arg("page") page: number
  ) {
    const query = {
      title: { $regex: new RegExp(".*" + searchWord + ".*", "i") },
    };
    const result = (await this.teamService.getAll(page, 9, query)) as I.Maybe<{
      lastPage: string;
      docs: TeamType[];
    }>;
    return { lastPage: result.lastPage, teams: result.docs };
  }
}

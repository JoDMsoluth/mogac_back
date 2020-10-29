import { Resolver, Mutation, Arg, Query, Ctx } from "type-graphql";
import * as I from "../../lib/helper/interfaces";
import { SignupRequestType } from "../users/dto/signupRequestType";
import { UserType } from "../../models/Users";
import { UpdateUserRequest } from "../users/dto/updateUserRequest";
import { Typegoose } from "@hasezoey/typegoose";
import { Inject } from "typedi";
import { TeamType } from "../../models/Teams";
import { SeriesType } from "../../models/Series";
import { AddTeamRequestType } from "../teams/dto/addTeamRequestType";
import { UpdateTeamRequestType } from "../teams/dto/updateTeamRequestType";
import { AddSeriesRequestType } from "../series/dto/addSeriesRequestType";
import { updateSeriesRequestType } from "../series/dto/updateSeriesRequestType";
import { CategoryType } from "../../models/Category";
import { CuCategoryRequestType } from "../category/dto/cuCategoryRequestType";
import { NotificationType } from "../../models/Notification";
import { MessageType } from "../../models/Message";
import { ResolveContext } from "../../lib/graphql/resolve-context";
import { AddNotificationRequestType } from "../notification/dto/addNotificationRequestType";
import { AddSkillSetRequestType } from "../skillset/dto/addSkillSetRequestType";
import { AddMessageRequestType } from "../message/dto/addMessageRequestType";
import { UserService } from "../../services/Users.service";

function createBaseCrudResolver<
  T extends I.ClassType<Typegoose>,
  X extends any,
  Z extends any
>(
  suffix: string,
  returnType: T,
  createInputType: X,
  updateInputType: Z,
  iocService: string
) {
  @Resolver((of) => returnType)
  class BaseCrudResolver {
    // constructor injection of a service

    constructor(
      @Inject(iocService) private readonly service,
      private readonly userService: UserService
    ) {}

    @Query((_return) => returnType, { name: `get${suffix}ById` })
    async getById(@Arg("id") id: I.ObjectId) {
    

      return this.service.tryFindById(id);
    }

    @Mutation((_type) => returnType, { name: `create${suffix}` })
    async create(@Arg("data", () => createInputType) data: any) {
      return this.service.create(data);
    }

    @Mutation((_type) => returnType, { name: `update${suffix}` })
    async update(
      @Arg("id") id: I.ObjectId,
      @Arg("data", () => updateInputType) data: any
    ) {
      return this.service.tryUpdateById(id, data);
    }

    @Mutation((_type) => String, { name: `delete${suffix}` })
    async delete(@Arg("id") id: I.ObjectId) {
      return this.service.tryDeleteById(id);
    }
  }

  return BaseCrudResolver;
}

export const UserCrudResolver = createBaseCrudResolver(
  "User",
  UserType,
  SignupRequestType,
  UpdateUserRequest,
  "UserService"
);

export const CategoryCrudResolver = createBaseCrudResolver(
  "Category",
  CategoryType,
  CuCategoryRequestType,
  CuCategoryRequestType,
  "CategoryService"
);

export const MessageCrudResolver = createBaseCrudResolver(
  "Message",
  MessageType,
  AddMessageRequestType,
  AddMessageRequestType,
  "MessageService"
);

export const NotificationCrudResolver = createBaseCrudResolver(
  "Notification",
  NotificationType,
  AddNotificationRequestType,
  AddNotificationRequestType,
  "NotificationService"
);

import { ClassType } from "type-graphql";
import { Service } from "typedi";

export default function BaseServiceMixin<T extends ClassType>(BaseRepo: T) {
  @Service()
  class BaseService extends BaseRepo {}
  return BaseService;
}

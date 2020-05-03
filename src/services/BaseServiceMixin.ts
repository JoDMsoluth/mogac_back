import { ClassType } from "type-graphql";
import { Service } from "typedi";
import { NotFoundError } from "../lib/helper/statused-error";
import { model } from "mongoose";

// 그냥 class로 상속을 받지 않은 이유 => 상속하는 클래스에 타입을 지정해주기 힘듬
// Higher order resolver : 매개변수인 BaseRepo에 타입을 지정해주기 위해 사용함
export default function BaseServiceMixin<T extends ClassType>(BaseRepo: T) {
  @Service()
  class BaseService extends BaseRepo {}
  return BaseService;
}

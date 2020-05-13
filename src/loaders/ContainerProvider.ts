import { UserService } from "../services/Users.service";
import { SeriesService } from "../services/Series.service";
import { CategoryService } from "../services/Category.service";
import { TeamService } from "../services/Team.service";
import { PostService } from "../services/post.service";
import { UserRepo } from "../repositorys/UserRepo";
import { NotificationService } from "../services/Notification.service";
import { MessageService } from "../services/Message.service";
import { SkillSetService } from "../services/SkillSet.service";

const Container = require("typedi").Container;

export default function ContainerProvier() {
  // Container.get하면 해당 클래스의 인스턴스를 얻는다.
  // 만약 그 클래스 안에 inject가 있으면 inject를 얻는다.
  // 하지만 type-graphql은 서드파티로 typedi를 쓰기에 서드파티만 추가하면 Constainer.get하지 않아도 됨
  Container.set("UserService", new UserService());
  Container.set("SeriesService", new SeriesService());
  Container.set("TeamService", new TeamService());
  Container.set("PostService", new PostService());
  Container.set("CategoryService", new CategoryService());
  Container.set("NotificationService", new NotificationService());
  Container.set("MessageService", new MessageService());
  Container.set("SkillSetService", new SkillSetService());
  Container.set("UserRepo", new UserRepo());
}

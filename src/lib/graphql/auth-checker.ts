import { AuthChecker } from "type-graphql";
import { ResolveContext } from "./resolve-context";
import { UserRole } from "../../models/Users";

export const authChecker: AuthChecker<ResolveContext, UserRole> = (
  { context: { user } },
  roles
) => user != null && roles.includes(user.role);

import * as I from "../lib/helper/interfaces";
import * as Apollo from "apollo-server-express";
import { buildSchema, ResolverData } from "type-graphql";
import { GqlObjectIdScalar } from "../lib/graphql/scalars/object-id";
import { makeContext, ResolveContext } from "../lib/graphql/resolve-context";
import { authChecker } from "../lib/graphql/auth-checker";
import Container from "typedi";

export class ApolloServer {
  static async createApolloServer() {
    return new Apollo.ApolloServer({
      playground: true,
      introspection: true,
      schema: await buildSchema({
        resolvers: [`${__dirname}/../resolvers/*/*.resolver.ts`],
        emitSchemaFile: `${__dirname}/../schema/schema.graphql`,
        scalarsMap: [{ scalar: GqlObjectIdScalar, type: I.ObjectId }],
        authChecker,
        // register the 3rd party IOC container
        container: Container,
      }),
      context: makeContext,
    });
  }
}

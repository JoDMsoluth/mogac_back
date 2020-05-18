import * as I from "../lib/helper/interfaces";
import * as Apollo from "apollo-server-express";
import { buildSchema, ResolverData } from "type-graphql";
import { GqlObjectIdScalar } from "../lib/graphql/scalars/object-id";
import { makeContext, ResolveContext } from "../lib/graphql/resolve-context";
import { authChecker } from "../lib/graphql/auth-checker";
import Container from "typedi";
import { UploadResponseType } from "../resolvers/users/dto/uploadType";

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
      uploads: {
        // Limits here should be stricter than config for surrounding
        // infrastructure such as Nginx so errors can be handled elegantly by
        // graphql-upload:
        // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
        maxFileSize: 10000000, // 10 MB
        maxFiles: 20,
      },
      context: makeContext,
    });
  }
}

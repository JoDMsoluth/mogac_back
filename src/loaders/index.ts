import * as express from "express";
import expressInit from "./expressInit";
import { createdb } from "./createdb";
import { createApolloServer } from "./createApollo";

export default async () => {
  const app = express();

  await expressInit({ app });
  console.log("Express Intialized");

  const apolloServer = await createApolloServer();
  console.log("Create Apollo Server");

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  await createdb();
  console.log("MongoDB Intialized");
  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
  return {
    app,
    apolloServer,
  };
};

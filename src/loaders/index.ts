import * as express from "express";
import expressInit from "./expressInit";
import { MongoDb } from "./MongoDb";
import { ApolloServer } from "./ApolloServer";

export default async () => {
  const app = express();

  await expressInit({ app });
  console.log("Express Intialized");

  const apolloServer = await ApolloServer.createApolloServer();
  console.log("Create Apollo Server");

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  await MongoDb.connect();
  console.log("MongoDB Intialized");
  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
  return {
    app,
    apolloServer,
  };
};

import * as express from "express";
import expressInit from "./expressInit";
import { MongoDb } from "./MongoDb";
import { ApolloServer } from "./ApolloServer";
import { Log } from "../lib/helper/debug";
import ContainerProvier from "./ContainerProvider";
import SocketServer from "./SocketServer";

export default async () => {
  ContainerProvier();

  const app = express();

  await expressInit({ app });
  Log.info("Express Intialized");

  const apolloServer = await ApolloServer.createApolloServer();
  Log.info("Create Apollo Server");

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  await MongoDb.connect();
  Log.info("MongoDB Intialized");
  // ... more loaders can be here

  const appWithSocket = await SocketServer({ app });
  Log.info("SocketServer Intialized");

  // ... Initialize agenda
  // ... or Redis, or whatever you want
  return {
    app: appWithSocket,
    apolloServer,
  };
};

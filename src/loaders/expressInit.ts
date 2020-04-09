import * as morgan from "morgan";
import * as config from "../configs";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

export default async ({ app }: { app: express.Application }) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  app.enable("trust proxy");

  app.use(cors());
  app.use(require("morgan")("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan("dev"));
  app.use(express.static(config.Frontend.DistDir));
  app.use(express.static(config.Frontend.AssetsDir));

  // ...More middlewares

  // Return the express app
  return app;
};

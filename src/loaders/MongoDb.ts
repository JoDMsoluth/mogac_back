import * as mongoose from "mongoose";
import * as config from "../configs/index";

export class MongoDb {
  private static connection: mongoose.Connection;
  private static readonly dbUrl: string =
    config.DatabaseUrl || "mongodb://localhost/127.0.0.1/";

  static async connect(url = MongoDb.dbUrl) {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      keepAlive: true,
      useCreateIndex: true,
      connectTimeoutMS: 30000,
    });
    MongoDb.connection = mongoose.connection;
    return MongoDb.connection;
  }

  static getDBModels(connection = MongoDb.connection) {
    return MongoDb.connection;
  }
}

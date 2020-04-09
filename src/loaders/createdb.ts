import * as mongoose from "mongoose";
import * as config from "../configs/index";

const dbUrl: string = config.DatabaseUrl || "mongodb://localhost/127.0.0.1/";

export async function createdb() {
  const connection = await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    keepAlive: true,
    useCreateIndex: true,
    connectTimeoutMS: 30000,
  });

  const db = connection.connection.db;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", function () {
    // we're connected!
    console.log("connected");
  });

  return db;
}

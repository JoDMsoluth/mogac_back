import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const mongoUrl: string =
  process.env.MONGO_DB || "mongodb://localhost/127.0.0.1/";

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  // we're connected!
  console.log("connected");
});

export default mongoose;

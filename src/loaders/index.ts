import expressLoader from "./express";
import mongooseLoader from "./mongoose";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log("MongoDB Intialized");
  await expressLoader({ app: expressApp });
  console.log("Express Intialized");

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
};

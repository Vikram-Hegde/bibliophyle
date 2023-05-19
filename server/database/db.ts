import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectionURL = process.env.CONNECTION_URL;

const connectToDB = async () => {
  if (!connectionURL) throw new Error("Database connection failure");
  await mongoose.connect(connectionURL, { dbName: "bibliophile" });
};
export default connectToDB;

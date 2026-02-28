import mongoose from "mongoose";
import config from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      // optional but helps with some serverless behavior
      serverSelectionTimeoutMS: 10000,
    });
    console.log(` MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(` MongoDB connection failed: ${err.message}`);
    throw err;
  }
};
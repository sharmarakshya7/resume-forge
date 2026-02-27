import mongoose from 'mongoose';
import config from './env.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌  MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

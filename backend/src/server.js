import app from './app.js';
import config from './config/env.js';
import { connectDB } from './config/db.js';

const start = async () => {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`🚀  Server running in ${config.nodeEnv} mode on port ${config.port}`);
    console.log(`📡  API: http://localhost:${config.port}/api/health`);
  });
};

start();

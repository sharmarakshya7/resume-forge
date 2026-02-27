import app from './app.js';
import config from './config/env.js';
import { connectDB } from './config/db.js';

// Connect to DB on cold start
connectDB().catch(console.error);

// Export app for Vercel (Vercel calls this as a serverless function)

export default app;

// Also listen normally for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(config.port, () => {
    console.log(`🚀  Server running on port ${config.port}`);
  });
}
import app from "./app.js";
import config from "./config/env.js";
import { connectDB } from "./config/db.js";

// Serverless-friendly: connect on cold start, do not crash the process
connectDB().catch((err) => {
  console.error(" DB init failed:", err.message);
});

// Export for Vercel serverless
export default app;

// Local dev only
if (process.env.NODE_ENV !== "production") {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}
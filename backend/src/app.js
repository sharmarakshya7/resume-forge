import express from "express";
import cors from "cors";
import config from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { connectDB } from "./config/db.js";

const app = express();

// Middleware
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Health Check (with DB check)
app.get("/api/health", async (req, res) => {
    try {
        await connectDB();
        res.status(200).json({ status: "ok", db: "connected" });
    } catch (err) {
        res.status(200).json({
            status: "ok",
            db: "failed",
            error: err.message,
        });
    }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
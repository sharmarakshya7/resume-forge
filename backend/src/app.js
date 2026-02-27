import express from 'express';
import cors from 'cors';
import config from './config/env.js';
import authRoutes   from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth',   authRoutes);
app.use('/api/resume', resumeRoutes);

// ── Error handling ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;

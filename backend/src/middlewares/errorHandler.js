import config from '../config/env.js';

/**
 * Global Express error handler.
 * Must be registered LAST with app.use() after all routes.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path} →`, err.message);

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message).join(', ');
    return res.status(400).json({ message: messages });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token.' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired. Please sign in again.' });
  }

  // Default
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal server error.',
    ...(config.nodeEnv === 'development' ? { stack: err.stack } : {}),
  });
};

/** Catch-all for unknown routes */
export const notFound = (req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found.` });
};

import jwt from 'jsonwebtoken';
import config from '../config/env.js';

/**
 * Sign a JWT containing the user's MongoDB _id.
 * @param {string} userId
 * @returns {string} signed JWT
 */
export const signToken = (userId) =>
  jwt.sign({ id: userId }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

/**
 * Verify a JWT and return the decoded payload.
 * Throws if invalid or expired.
 */
export const verifyToken = (token) =>
  jwt.verify(token, config.jwt.secret);

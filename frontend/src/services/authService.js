import { api } from './api.js';

/**
 * Register a new user.
 * @returns {{ user, token }}
 */
export const signup = (name, email, password) =>
  api.post('/auth/signup', { name, email, password });

/**
 * Login an existing user.
 * @returns {{ user, token }}
 */
export const login = (email, password) =>
  api.post('/auth/login', { email, password });

/**
 * Request a password-reset code to be emailed.
 * @returns {{ message }}
 */
export const forgotPassword = (email) =>
  api.post('/auth/forgot-password', { email });

/**
 * Verify the 6-digit reset code.
 * @returns {{ message }}
 */
export const verifyResetCode = (email, code) =>
  api.post('/auth/verify-reset-code', { email, code });

/**
 * Set a new password after code verification.
 * @returns {{ message }}
 */
export const resetPassword = (email, code, newPassword) =>
  api.post('/auth/reset-password', { email, code, newPassword });

/**
 * Persist token + user to localStorage after successful auth.
 */
export const persistSession = ({ user, token }) => {
  localStorage.setItem('rb_token', token);
  localStorage.setItem('rb_user',  JSON.stringify(user));
};

/**
 * Clear session from localStorage.
 */
export const clearSession = () => {
  localStorage.removeItem('rb_token');
  localStorage.removeItem('rb_user');
};

/**
 * Read the current user from localStorage (page reload persistence).
 */
export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('rb_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

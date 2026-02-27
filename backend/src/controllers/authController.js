import crypto from 'crypto';
import User from '../models/User.js';
import { signToken } from '../utils/generateToken.js';
import { sendResetCodeEmail } from '../services/emailService.js';
import config from '../config/env.js';

// ─── POST /api/auth/signup ────────────────────────────────────────────────────
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const user  = await User.create({ name, email, password });
  const token = signToken(user._id);

  res.status(201).json({ user, token });
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Incorrect email or password.' });
  }

  const token = signToken(user._id);
  res.json({ user, token });
};

// ─── POST /api/auth/forgot-password ──────────────────────────────────────────
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // Always respond with 200 to prevent email enumeration
  if (!user) {
    return res.json({ message: 'If that email is registered, a reset code was sent.' });
  }

  // Generate 6-digit code
  const code    = String(Math.floor(100000 + Math.random() * 900000));
  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 min

  user.resetCode        = code;
  user.resetCodeExpires = expires;
  await user.save({ validateBeforeSave: false });

  try {
    await sendResetCodeEmail(email, code);
  } catch (err) {
    console.error('Email send error:', err.message);
    // In development, return code in response for easy testing
    if (config.nodeEnv === 'development') {
      return res.json({
        message: 'Reset code generated (dev mode — email not sent).',
        devCode: code,
      });
    }
    return res.status(500).json({ message: 'Failed to send email. Please try again.' });
  }

  res.json({ message: 'Reset code sent to your email.' });
};

// ─── POST /api/auth/verify-reset-code ────────────────────────────────────────
export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.resetCode !== code) {
    return res.status(400).json({ message: 'Invalid code. Please try again.' });
  }
  if (user.resetCodeExpires < new Date()) {
    return res.status(400).json({ message: 'Code has expired. Please request a new one.' });
  }

  res.json({ message: 'Code verified.' });
};

// ─── POST /api/auth/reset-password ───────────────────────────────────────────
export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  const user = await User.findOne({ email });
  if (!user || user.resetCode !== code || user.resetCodeExpires < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired code.' });
  }

  user.password         = newPassword; // will be hashed by pre-save hook
  user.resetCode        = null;
  user.resetCodeExpires = null;
  await user.save();

  res.json({ message: 'Password updated successfully.' });
};

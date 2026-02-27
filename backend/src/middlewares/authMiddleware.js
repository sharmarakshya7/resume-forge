import User from '../models/User.js';
import { verifyToken } from '../utils/generateToken.js';

/**
 * Protect middleware — attaches req.user if JWT is valid.
 * Use on any route that requires authentication.
 */
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorised. Please sign in.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }

    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token. Please sign in again.' });
  }
};

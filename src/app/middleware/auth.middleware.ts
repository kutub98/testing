import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../modules/User/user.model';
import config from '../config';

export interface AuthRequest extends Request {
  authUser?: { userId: string; role: string };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res
        .status(401)
        .json({ success: false, message: 'Access denied. No token provided.' });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt_secret as string) as {
      userId: string;
    };

    // Check if token exists in user's tokens array
    const user = await User.findOne({ _id: decoded.userId, tokens: token });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid token' });
      return;
    }

    req.authUser = { userId: decoded.userId, role: user.role };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
          await User.updateOne({ tokens: token }, { $pull: { tokens: token } });
        }
      } catch (dbError) {
        console.error('Error removing expired token:', dbError);
      }
      res.status(401).json({ success: false, message: 'Token expired' });
      return;
    }
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const requireRole = (roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.authUser) {
        res
          .status(401)
          .json({ success: false, message: 'Authentication required' });
        return;
      }
      if (!roles.includes(req.authUser.role)) {
        res
          .status(403)
          .json({ success: false, message: 'Insufficient permissions' });
        return;
      }
      next();
    } catch (error) {
      res.status(403).json({ success: false, message: 'Access denied' });
    }
  };
};

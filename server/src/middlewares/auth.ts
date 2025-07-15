import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { createError } from './errorHandler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    let token = req.cookies['auth_token'];

    // If no cookie, check Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) throw createError('No auth token', 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  }
);

const isRoleAndApproved = (
  user: any,
  role: 'admin' | 'educator' | 'student'
): boolean => {
  return (
    user?.role === role &&
    user?.applicationStatus === 'approved' &&
    user?.status !== 'suspended'
  );
};

export const isAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!isRoleAndApproved(user, 'admin')) {
      return res
        .status(403)
        .json({ message: 'Forbidden: Approved Admins only' });
    }

    next();
  }
);

export const isEducator = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!isRoleAndApproved(user, 'educator')) {
      return res
        .status(403)
        .json({ message: 'Forbidden: Approved Educators only' });
    }

    next();
  }
);

export const isStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (user?.role !== 'student') {
      return res.status(403).json({ message: 'Forbidden: Students only' });
    }
    next();
  }
);

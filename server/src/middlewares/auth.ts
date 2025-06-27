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
    const token = req.cookies['auth_token'];
    if (!token) throw createError('No auth token', 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  }
);

export const isAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (user?.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
  }
);

export const isEducator = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (user?.role !== 'educator') {
      return res.status(403).json({ message: 'Forbidden: Educators only' });
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

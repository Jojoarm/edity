import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { createError } from './errorHandler';
import jwt, { JwtPayload } from 'jsonwebtoken';

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

import { NextFunction, Request, Response } from 'express';

export const createError = (message: string, statusCode = 500) => {
  const error = new Error(message) as Error & { statusCode?: number };
  error.statusCode = statusCode;
  return error;
};

// Global error handler middleware
export const errorHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.log('Error:', message);
  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });
};

// catching any error and passing it to errorHandler
import { Request, Response, NextFunction } from 'express';

type AsyncFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const catchAsync = (fn: AsyncFn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // Pass any errors to errorHandler
  };
};

import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { createError } from '../../middlewares/errorHandler';
import ClassLevel from '../../models/admin/ClassLevel';

export const createClassLevel = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const adminId = req.userId;
    const { name, description } = req.body;
    const existingClassLevel = await ClassLevel.findOne({ name });
    if (existingClassLevel) throw createError('Class Level already exist', 400);

    await ClassLevel.create({ name, description, createdBy: adminId });
    res.status(200).json({
      success: true,
      message: 'Class Level Created!',
    });
  }
);

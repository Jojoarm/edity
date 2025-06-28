import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import AcademicYear from '../../models/admin/AcademicYear';
import { createError } from '../../middlewares/errorHandler';

export const createAcademicYear = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const adminId = req.userId;
    const { name, startDate, endDate, isCurrent } = req.body;
    const existingAcademicYear = await AcademicYear.findOne({ name });
    if (existingAcademicYear) throw createError('Academic Year already exist');

    await AcademicYear.create({
      name,
      startDate,
      endDate,
      isCurrent,
      createdBy: adminId,
    });
    res.status(200).json({
      success: true,
      message: 'Academic Year Created!',
    });
  }
);

export const getAcademicYears = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const years = await AcademicYear.find();
    if (years.length === 0) throw createError('No Academic Year found');
    res.status(200).json({ success: true, data: years });
  }
);

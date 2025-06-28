import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { createError } from '../../middlewares/errorHandler';
import AcademicTerm from '../../models/admin/AcademicTerm';

export const createAcademicTerm = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const adminId = req.userId;
    const { name, startDate, endDate, academicYear } = req.body;
    const existingAcademicTerm = await AcademicTerm.findOne({ name });
    if (existingAcademicTerm) throw createError('Academic Term already exist');

    await AcademicTerm.create({
      name,
      startDate,
      endDate,
      academicYear,
      createdBy: adminId,
    });
    res.status(200).json({
      success: true,
      message: 'Academic Term Created!',
    });
  }
);

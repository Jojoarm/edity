import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { createError } from '../../middlewares/errorHandler';
import Course from '../../models/admin/Course';

export const createCourse = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const adminId = req.userId;
    const {
      title,
      description,
      subject,
      academicYear,
      academicTerm,
      classLevel,
    } = req.body;
    const existingCourse = await Course.findOne({
      title,
      academicYear,
      academicTerm,
      classLevel,
    });

    if (existingCourse)
      throw createError(
        'Course with this title already exist for this academic year'
      );

    await Course.create({
      title,
      description,
      subject,
      academicYear,
      academicTerm,
      classLevel,
      createdBy: adminId,
    });
    res.status(200).json({
      success: true,
      message: 'Course Created!',
    });
  }
);

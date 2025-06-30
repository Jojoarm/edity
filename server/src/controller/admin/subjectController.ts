import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { createError } from '../../middlewares/errorHandler';
import Subject from '../../models/admin/Subject';

export const createSubject = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const adminId = req.userId;
    const { name, description } = req.body;
    const existingSubject = await Subject.findOne({ name });
    if (existingSubject) throw createError('Subject already exist');

    await Subject.create({ name, description, createdBy: adminId });
    res.status(200).json({
      success: true,
      message: 'Subject Created!',
    });
  }
);

export const getSubjects = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const subjects = await Subject.find();
    if (subjects.length === 0) throw createError('No Subject found');
    res.status(200).json({ success: true, data: subjects });
  }
);

export const updateSubject = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const updated = await Subject.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) throw createError('Subject not found', 404);
    res.status(200).json({ success: true, data: updated });
  }
);

export const deleteSubject = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const deleted = await Subject.findByIdAndDelete(id);
    if (!deleted) throw createError('Subject not found', 404);

    res.status(200).json({ success: true, message: 'Subject deleted' });
  }
);

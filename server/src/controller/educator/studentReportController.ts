import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { createError } from '../../middlewares/errorHandler';
import { generateStudentReportPrompt } from '../../utils/prompts';
import { ai } from '../../utils/utils';
import User from '../../models/User';
import dayjs from 'dayjs';

export const createStudentReport = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const {
      studentName,
      subject,
      term,
      classLevel,
      strengths,
      improvementAreas,
      behaviorAndParticipation,
      academicPerformanceSummary,
      teacherNote,
    } = req.body;

    const educatorId = req.userId;

    const educator = await User.findById(educatorId);
    if (!educator) throw createError('No Educator data found', 400);

    const educatorName = educator.name;
    const educatorContact = educator.email;
    const date = Date.now();
    const currentDate = dayjs(date).format('MMMM DD, YYYY');

    const prompt = generateStudentReportPrompt({
      studentName,
      subject,
      term,
      classLevel,
      strengths,
      improvementAreas,
      behaviorAndParticipation,
      academicPerformanceSummary,
      teacherNote,
      educatorName,
      educatorContact,
      currentDate,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!response) throw createError('Failed to generate student report');

    const report = response.text;

    res.status(200).json({
      success: true,
      message: 'Report generated!',
      report,
    });
  }
);

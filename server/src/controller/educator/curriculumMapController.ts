import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { createError } from '../../middlewares/errorHandler';
import { generateCurriculumMapPrompt } from '../../utils/prompts';
import { ai } from '../../utils/utils';

export const createCurriculumMap = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { subject, topicCount, classLevel, term } = req.body;
    const prompt = generateCurriculumMapPrompt({
      subject,
      topicCount,
      classLevel,
      term,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!response)
      throw createError('Failed to generate curriculum map from gemini');

    const curriculumMap = response.text;

    res.status(200).json({
      success: true,
      message: 'Curriculum map created!',
      curriculumMap,
    });
  }
);

import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { createError } from '../../middlewares/errorHandler';
import { generateActivityIdeaGeneratorPrompt } from '../../utils/prompts';
import { ai } from '../../utils/utils';

export const createActivityIdeas = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const prompt = generateActivityIdeaGeneratorPrompt({
      ...req.body,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!response) throw createError('Failed to generate activity ideas');

    const activityIdea = response.text;

    res.status(200).json({
      success: true,
      message: 'Activity ideas created!',
      activityIdea,
    });
  }
);

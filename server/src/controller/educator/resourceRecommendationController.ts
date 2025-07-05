import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { createError } from '../../middlewares/errorHandler';
import { generateResourceRecommendationPrompt } from '../../utils/prompts';
import { ai } from '../../utils/utils';

export const createResourceRecommendation = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { learningObjective, subject, topic, classLevel, term } = req.body;
    const prompt = generateResourceRecommendationPrompt({
      subject,
      topic,
      learningObjective,
      classLevel,
      term,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!response)
      throw createError('Failed to generate recommended resources from gemini');

    const recommendedResources = response.text;

    res.status(200).json({
      success: true,
      message: 'Recommended Resources curated!',
      recommendedResources,
    });
  }
);

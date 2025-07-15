import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { createError } from '../../middlewares/errorHandler';
import { generateConceptExplainerPrompt } from '../../utils/prompts';
import { ai } from '../../utils/utils';

export const createConceptExplanation = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const prompt = generateConceptExplainerPrompt({
      ...req.body,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!response) throw createError('Failed to generate explanation');

    const explanation = response.text;

    res.status(200).json({
      success: true,
      message: 'Explanation generated!',
      explanation,
    });
  }
);

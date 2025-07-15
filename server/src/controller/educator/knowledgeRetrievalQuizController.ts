import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { createError } from '../../middlewares/errorHandler';
import { generateKnowledgeRetrievalQuizPrompt } from '../../utils/prompts';
import { ai } from '../../utils/utils';

export const createKnowledgeRetrievalQuiz = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const prompt = generateKnowledgeRetrievalQuizPrompt({
      ...req.body,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!response) throw createError('Failed to generate quiz');

    const quiz = response.text;

    res.status(200).json({
      success: true,
      message: 'Quiz created!',
      quiz,
    });
  }
);

import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { GoogleGenAI } from '@google/genai';
import { createError } from '../../middlewares/errorHandler';
import { generateLessonPlanPrompt } from '../../utils/prompts';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const createLessonPlan = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const { learningObjective, subject, topic, classLevel, duration } =
      req.body;
    const prompt = generateLessonPlanPrompt({
      subject,
      topic,
      learningObjective,
      classLevel,
      duration,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!response)
      throw createError('Failed to generate lesson plan from gemini');

    const lessonPlan = response.text;

    res.status(200).json({
      success: true,
      message: 'Lesson plan created!',
      lessonPlan,
    });
  }
);

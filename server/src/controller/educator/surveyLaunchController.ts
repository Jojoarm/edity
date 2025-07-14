import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import User from '../../models/User';
import { createError } from '../../middlewares/errorHandler';
import dayjs from 'dayjs';
import { generateSurveyLaunchPrompt } from '../../utils/prompts';
import { ai } from '../../utils/utils';

export const createSurvey = catchAsync(
  async (req: Request, res: Response): Promise<any> => {
    const {
      surveyTitle,
      targetAudience,
      purposeDescription,
      deliveryFormat,
      questionTypes,
      launchDate,
      deadline,
    } = req.body;

    const educatorId = req.userId;
    const educator = await User.findById(educatorId);
    if (!educator) throw createError('No Educator data found', 404);

    const coordinatorName = educator.name;
    const coordinatorContact = educator.email;
    const date = Date.now();
    const currentDate = dayjs(date).format('MMMM DD, YYYY');

    const prompt = generateSurveyLaunchPrompt({
      surveyTitle,
      targetAudience,
      purposeDescription,
      deliveryFormat,
      questionTypes,
      launchDate,
      deadline,
      coordinatorName,
      coordinatorContact,
      currentDate,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    if (!response) throw createError('Failed to launch survery');

    const survey = response.text;

    res.status(200).json({
      success: true,
      message: 'Survey Launched!',
      survey,
    });
  }
);

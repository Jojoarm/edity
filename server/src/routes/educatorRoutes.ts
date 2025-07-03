import express from 'express';
import { createLessonPlan } from '../controller/educator/lessonPlanController';
import { isEducator, verifyToken } from '../middlewares/auth';

const educatorRouter = express.Router();

educatorRouter.post(
  '/create-lesson-plan',
  verifyToken,
  isEducator,
  createLessonPlan
);

export default educatorRouter;

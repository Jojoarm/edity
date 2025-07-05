import express from 'express';
import { createLessonPlan } from '../controller/educator/lessonPlanController';
import { isEducator, verifyToken } from '../middlewares/auth';
import { createCurriculumMap } from '../controller/educator/curriculumMapController';
import {
  validateCreateCurriculumMap,
  validateCreateLessonPlan,
} from '../middlewares/validator';

const educatorRouter = express.Router();

educatorRouter.post(
  '/create-lesson-plan',
  verifyToken,
  isEducator,
  validateCreateLessonPlan,
  createLessonPlan
);

educatorRouter.post(
  '/create-curriculum-map',
  verifyToken,
  isEducator,
  validateCreateCurriculumMap,
  createCurriculumMap
);

export default educatorRouter;

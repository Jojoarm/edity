import express from 'express';
import { createLessonPlan } from '../controller/educator/lessonPlanController';
import { isEducator, verifyToken } from '../middlewares/auth';
import { createCurriculumMap } from '../controller/educator/curriculumMapController';
import {
  validateCreateCurriculumMap,
  validateCreateLessonPlan,
  validateCreateRecommendedResources,
} from '../middlewares/validator';
import { createResourceRecommendation } from '../controller/educator/resourceRecommendationController';

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

educatorRouter.post(
  '/create-resource-recommendation',
  verifyToken,
  isEducator,
  validateCreateRecommendedResources,
  createResourceRecommendation
);

export default educatorRouter;

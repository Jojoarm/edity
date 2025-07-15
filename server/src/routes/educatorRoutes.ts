import express from 'express';
import { createLessonPlan } from '../controller/educator/lessonPlanController';
import { isEducator, verifyToken } from '../middlewares/auth';
import { createCurriculumMap } from '../controller/educator/curriculumMapController';
import {
  validateCreatActivityIdea,
  validateCreateCurriculumMap,
  validateCreateExplanation,
  validateCreateLessonPlan,
  validateCreateRecommendedResources,
  validateCreateRetrievalQuiz,
  validateCreateStudentReport,
  validateCreateSurvey,
} from '../middlewares/validator';
import { createResourceRecommendation } from '../controller/educator/resourceRecommendationController';
import { createStudentReport } from '../controller/educator/studentReportController';
import { createSurvey } from '../controller/educator/surveyLaunchController';
import { createKnowledgeRetrievalQuiz } from '../controller/educator/knowledgeRetrievalQuizController';
import { createActivityIdeas } from '../controller/educator/activityIdeaController';
import { createConceptExplanation } from '../controller/educator/conceptExplanationController';

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

educatorRouter.post(
  '/create-report',
  verifyToken,
  isEducator,
  validateCreateStudentReport,
  createStudentReport
);

educatorRouter.post(
  '/create-survey',
  verifyToken,
  isEducator,
  validateCreateSurvey,
  createSurvey
);

educatorRouter.post(
  '/create-knowledge-retrieval-quiz',
  verifyToken,
  isEducator,
  validateCreateRetrievalQuiz,
  createKnowledgeRetrievalQuiz
);

educatorRouter.post(
  '/create-activity-idea',
  verifyToken,
  isEducator,
  validateCreatActivityIdea,
  createActivityIdeas
);

educatorRouter.post(
  '/create-concept-explanation',
  verifyToken,
  isEducator,
  validateCreateExplanation,
  createConceptExplanation
);

export default educatorRouter;

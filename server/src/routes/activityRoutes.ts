import express from 'express';
import { verifyToken } from '../middlewares/auth';
import {
  validateCreateActivity,
  validateCreateGoal,
} from '../middlewares/validator';
import {
  createActivity,
  createGoal,
  dashboardData,
  deleteActivities,
  deleteActivity,
  deleteGoal,
  fetchActivities,
  fetchActivity,
  fetchGoal,
  fetchGoals,
  updateActivity,
  updateGoal,
} from '../controller/activityController';
import upload from '../middlewares/upload';

const activityRouter = express.Router();

// activities
activityRouter.post(
  '/add-activity',
  verifyToken,
  upload.single('certificate'),
  validateCreateActivity,
  createActivity
);
activityRouter.put(
  '/update-activity/:id',
  verifyToken,
  upload.single('certificate'),
  validateCreateActivity,
  updateActivity
);
activityRouter.get('/fetch-activities', verifyToken, fetchActivities);
activityRouter.get('/fetch-activity/:id', verifyToken, fetchActivity);
activityRouter.delete('/delete-activity/:id', verifyToken, deleteActivity);
activityRouter.post('/bulk-delete-activities', verifyToken, deleteActivities);

// goals
activityRouter.post('/add-goal', verifyToken, validateCreateGoal, createGoal);
activityRouter.put(
  '/update-goal/:id',
  verifyToken,
  validateCreateGoal,
  updateGoal
);
activityRouter.get('/fetch-goals', verifyToken, fetchGoals);
activityRouter.get('/fetch-goal/:id', verifyToken, fetchGoal);
activityRouter.delete('/delete-goal/:id', verifyToken, deleteGoal);

//dashboard data
activityRouter.get('/dashboard-data', verifyToken, dashboardData);

export default activityRouter;

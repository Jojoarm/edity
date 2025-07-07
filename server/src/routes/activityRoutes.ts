import express from 'express';
import { verifyToken } from '../middlewares/auth';
import { validateCreateActivity } from '../middlewares/validator';
import {
  createActivity,
  fetchActivities,
} from '../controller/activityController';
import upload from '../middlewares/upload';

const activityRouter = express.Router();

activityRouter.post(
  '/add-activity',
  verifyToken,
  upload.single('certificate'),
  validateCreateActivity,
  createActivity
);
activityRouter.get('/fetch-activities', verifyToken, fetchActivities);

export default activityRouter;

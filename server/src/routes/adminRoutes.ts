import express from 'express';
import { isAdmin, verifyToken } from '../middlewares/auth';
import {
  approveRequest,
  getPendingRoleRequests,
  rejectRequest,
} from '../controller/admin/roleRequestController';
import {
  createAcademicYear,
  getAcademicYears,
} from '../controller/admin/academicYearController';
import { createAcademicTerm } from '../controller/admin/academicTermController';
import {
  validateCreateAcademicTerm,
  validateCreateAcademicYear,
  validateCreateClassLevel,
  validateCreateCourse,
  validateCreateSubject,
} from '../middlewares/validator';
import { createClassLevel } from '../controller/admin/classLevelController';
import { createCourse } from '../controller/admin/courseController';
import { createSubject } from '../controller/admin/subjectController';

const adminRouter = express.Router();

adminRouter.get(
  '/pending-requests',
  verifyToken,
  isAdmin,
  getPendingRoleRequests
);
adminRouter.put('/approve-request', verifyToken, isAdmin, approveRequest);
adminRouter.put('/reject-request', verifyToken, isAdmin, rejectRequest);
adminRouter.post(
  '/create-academic-year',
  verifyToken,
  isAdmin,
  validateCreateAcademicYear,
  createAcademicYear
);
adminRouter.get('/academic-years', verifyToken, isAdmin, getAcademicYears);
adminRouter.post(
  '/create-academic-term',
  verifyToken,
  isAdmin,
  validateCreateAcademicTerm,
  createAcademicTerm
);
adminRouter.post(
  '/create-class-level',
  verifyToken,
  isAdmin,
  validateCreateClassLevel,
  createClassLevel
);
adminRouter.post(
  '/create-course',
  verifyToken,
  isAdmin,
  validateCreateCourse,
  createCourse
);
adminRouter.post(
  '/create-subject',
  verifyToken,
  isAdmin,
  validateCreateSubject,
  createSubject
);

export default adminRouter;

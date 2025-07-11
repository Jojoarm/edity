import express from 'express';
import { isAdmin, isEducator, verifyToken } from '../middlewares/auth';
import {
  approveRequest,
  getPendingRoleRequests,
  rejectRequest,
} from '../controller/admin/roleRequestController';
import {
  createAcademicYear,
  getAcademicYears,
} from '../controller/admin/academicYearController';
import {
  createAcademicTerm,
  getAcademicTerms,
} from '../controller/admin/academicTermController';
import {
  validateCreateAcademicTerm,
  validateCreateAcademicYear,
  validateCreateClassLevel,
  validateCreateCourse,
  validateCreateSubject,
} from '../middlewares/validator';
import {
  createClassLevel,
  getClassLevels,
} from '../controller/admin/classLevelController';
import { createCourse, getCourses } from '../controller/admin/courseController';
import {
  createSubject,
  getSubjects,
} from '../controller/admin/subjectController';

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
adminRouter.get('/academic-years', getAcademicYears);

adminRouter.post(
  '/create-academic-term',
  verifyToken,
  isAdmin,
  validateCreateAcademicTerm,
  createAcademicTerm
);
adminRouter.get('/academic-terms', getAcademicTerms);

adminRouter.post(
  '/create-class-level',
  verifyToken,
  isAdmin,
  validateCreateClassLevel,
  createClassLevel
);
adminRouter.get('/class-levels', getClassLevels);

adminRouter.post(
  '/create-course',
  verifyToken,
  isAdmin,
  validateCreateCourse,
  createCourse
);
adminRouter.get('/courses', getCourses);

adminRouter.post(
  '/create-subject',
  verifyToken,
  isAdmin,
  validateCreateSubject,
  createSubject
);
adminRouter.get('/subjects', getSubjects);

export default adminRouter;

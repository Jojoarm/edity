import { NextFunction, Request, Response } from 'express';
import { check, param, validationResult, body } from 'express-validator';
import mongoose from 'mongoose';

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Enhanced sign-up validation
export const validateUserSignUpRequest = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 255 })
    .withMessage('Email is too long'),

  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),

  check('role')
    .optional()
    .isIn(['educator', 'admin', 'student', 'stakeholder', 'researcher'])
    .withMessage('Invalid role specified'),

  check('dob')
    .optional()
    .isISO8601()
    .withMessage('Date of birth must be a valid date')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 120) {
        throw new Error('Age must be between 13 and 120 years');
      }
      return true;
    }),

  check('gender')
    .optional()
    .isIn(['male', 'female'])
    .withMessage('Gender must be either male or female'),

  check('tel')
    .optional()
    .trim()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),

  check('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address is too long'),

  handleValidationErrors,
];

// Enhanced login validation
export const validateUserLoginRequest = [
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address'),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 })
    .withMessage('Password cannot be empty'),

  handleValidationErrors,
];

// Validation for updating user profile
export const validateUserUpdateRequest = [
  check('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  check('dob')
    .optional()
    .isISO8601()
    .withMessage('Date of birth must be a valid date'),

  check('gender')
    .optional()
    .isIn(['male', 'female'])
    .withMessage('Gender must be either male or female'),

  check('tel')
    .optional()
    .trim()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),

  check('address')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Address is too long'),

  check('profilePicture')
    .optional()
    .isURL()
    .withMessage('Profile picture must be a valid URL'),

  handleValidationErrors,
];

// Validation for password change
export const validatePasswordChangeRequest = [
  check('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),

  check('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'New password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),

  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Password confirmation does not match new password');
    }
    return true;
  }),

  handleValidationErrors,
];

export const validateCreateAcademicYear = [
  check('name')
    .notEmpty()
    .withMessage('Academic year name is required')
    .matches(/^\d{4}\/\d{4}$/)
    .withMessage('Academic year name must be in the format "2024/2025"'),

  check('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid ISO8601 date'),

  check('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid ISO8601 date')
    .custom((value, { req }) => {
      const start = new Date(req.body.startDate);
      const end = new Date(value);
      if (start >= end) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  check('isCurrent')
    .optional()
    .isBoolean()
    .withMessage('isCurrent must be a boolean'),

  handleValidationErrors,
];

export const validateCreateAcademicTerm = [
  check('name')
    .notEmpty()
    .withMessage('Term name is required')
    .isIn(['First Term', 'Second Term', 'Third Term'])
    .withMessage('Name must be First Term, Second Term, or Third Term'),

  check('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid ISO8601 date'),

  check('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid ISO8601 date')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (startDate >= endDate) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),

  check('academicYear')
    .notEmpty()
    .withMessage('Academic year is required')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid academicYear ID'),

  check('createdBy') // optional: for cases when not set from token
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid createdBy ID'),

  handleValidationErrors,
];

export const validateCreateClassLevel = [
  check('name')
    .notEmpty()
    .withMessage('Class level name is required')
    .isString()
    .withMessage('Class level name must be a string')
    .isLength({ min: 2 })
    .withMessage('Class level name must be at least 2 characters'),

  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  handleValidationErrors,
];

export const validateCreateCourse = [
  check('title')
    .notEmpty()
    .withMessage('Course title is required')
    .isString()
    .withMessage('Course title must be a string')
    .isLength({ min: 3 })
    .withMessage('Course title must be at least 3 characters long'),

  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  check('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .isString()
    .withMessage('Subject must be a string'),

  check('academicYear')
    .notEmpty()
    .withMessage('Academic Year is required')
    .isMongoId()
    .withMessage('Academic Year must be a valid Mongo ID'),

  check('academicTerm')
    .notEmpty()
    .withMessage('Academic Term is required')
    .isMongoId()
    .withMessage('Academic Term must be a valid Mongo ID'),

  check('classLevel')
    .notEmpty()
    .withMessage('Class Level is required')
    .isMongoId()
    .withMessage('Class Level must be a valid Mongo ID'),

  handleValidationErrors,
];

export const validateCreateSubject = [
  check('name')
    .notEmpty()
    .withMessage('Subject name is required')
    .isString()
    .withMessage('Subject name must be a string')
    .isLength({ min: 2 })
    .withMessage('Subject name must be at least 2 characters long'),

  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  handleValidationErrors,
];

export const validateCreateLessonPlan = [
  check('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .isString()
    .withMessage('Subject must be a string'),

  check('topic')
    .notEmpty()
    .withMessage('Topic is required')
    .isString()
    .withMessage('Topic must be a string'),

  check('classLevel')
    .notEmpty()
    .withMessage('Class Level is required')
    .isString()
    .withMessage('Class Level must be a string'),

  check('duration')
    .notEmpty()
    .withMessage('Duration is required')
    .isString()
    .withMessage('Duration must be a string'),

  check('learningObjective')
    .notEmpty()
    .withMessage('Learing Objective is required')
    .isString()
    .withMessage('Learning Objective must be a string'),

  handleValidationErrors,
];

export const validateCreateCurriculumMap = [
  check('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .isString()
    .withMessage('Subject must be a string'),

  check('term')
    .notEmpty()
    .withMessage('Academic Term is required')
    .isString()
    .withMessage('Academic Term must be a string'),

  check('classLevel')
    .notEmpty()
    .withMessage('Class Level is required')
    .isString()
    .withMessage('Class Level must be a string'),

  check('topicCount')
    .notEmpty()
    .withMessage('Topic Count is required')
    .isNumeric()
    .withMessage('Topic Count must be a number'),

  handleValidationErrors,
];

export const validateCreateRecommendedResources = [
  check('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .isString()
    .withMessage('Subject must be a string'),

  check('topic')
    .notEmpty()
    .withMessage('Topic is required')
    .isString()
    .withMessage('Topic must be a string'),

  check('classLevel')
    .notEmpty()
    .withMessage('Class Level is required')
    .isString()
    .withMessage('Class Level must be a string'),

  check('term')
    .notEmpty()
    .withMessage('Term is required')
    .isString()
    .withMessage('Term must be a string'),

  check('learningObjective')
    .notEmpty()
    .withMessage('Learing Objective is required')
    .isString()
    .withMessage('Learning Objective must be a string'),

  handleValidationErrors,
];

export const validateCreateStudentReport = [
  check('studentName')
    .notEmpty()
    .withMessage('Student Name is required')
    .isString()
    .withMessage('Student Name must be a string'),

  check('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .isString()
    .withMessage('Subject must be a string'),

  check('classLevel')
    .notEmpty()
    .withMessage('Class Level is required')
    .isString()
    .withMessage('Class Level must be a string'),

  check('term')
    .notEmpty()
    .withMessage('Term is required')
    .isString()
    .withMessage('Term must be a string'),

  check('strengths')
    .notEmpty()
    .withMessage('Student Strengths is required')
    .isString()
    .withMessage('Student Strengths must be a string'),

  check('improvementAreas')
    .notEmpty()
    .withMessage('Improvement Areas is required')
    .isString()
    .withMessage('Improvement Areas must be a string'),

  check('behaviorAndParticipation')
    .notEmpty()
    .withMessage('Behavior and Participation is required')
    .isString()
    .withMessage('Behavior and Participation must be a string'),

  check('academicPerformanceSummary')
    .notEmpty()
    .withMessage('Academic Performance Summary is required')
    .isString()
    .withMessage('Academic Performance Summary must be a string'),

  handleValidationErrors,
];

export const validateCreateActivity = [
  check('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  check('type')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Type must be between 2 and 100 characters'),
  check('provider')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Type must be between 2 and 100 characters'),
  check('date').isISO8601().withMessage('Date must be a valid date'),
  check('status')
    .optional({ values: 'falsy' })
    .isIn(['completed', 'in-progress', 'registered', 'planned'])
    .withMessage('Unhandled Status type'),
  check('description')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Description must be between 2 and 500 characters'),

  handleValidationErrors,
];

export const validateCreateGoal = [
  check('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  check('type')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Type must be between 2 and 100 characters'),
  check('description')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Description must be between 2 and 500 characters'),
  check('current')
    .isInt({ min: 0 })
    .withMessage('Current must be a number and at least 0')
    .custom((value, { req }) => {
      const target = parseInt(req.body.target);
      const current = parseInt(value);

      if (target && current > target) {
        throw new Error('Current value cannot exceed target value');
      }
      return true;
    }),

  check('target')
    .isInt({ min: 1 })
    .withMessage('Target must be a number and at least 1')
    .custom((value, { req }) => {
      const current = parseInt(req.body.current);
      const target = parseInt(value);

      if (current && current > target) {
        throw new Error(
          'Target value must be greater than or equal to current value'
        );
      }
      return true;
    }),
  check('deadline').isISO8601().withMessage('Deadline must be a valid date'),
  check('status')
    .optional({ values: 'falsy' })
    .isIn(['completed', 'in-progress', 'registered', 'planned', 'overdue'])
    .withMessage('Unhandled status type'),
  check('priority')
    .optional({ values: 'falsy' })
    .isIn(['high', 'medium', 'low'])
    .withMessage('Unhandled priority type'),
  check('category')
    .optional({ values: 'falsy' })
    .isIn([
      'Required',
      'Skill Development',
      'Certification',
      'Leadership',
      'Technology',
      'Other',
    ])
    .withMessage('Unhandled category type'),

  handleValidationErrors,
];

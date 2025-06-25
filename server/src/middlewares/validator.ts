import { NextFunction, Request, Response } from 'express';
import { check, param, validationResult, body } from 'express-validator';

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

// Validation for role-specific data
export const validateEducatorDataRequest = [
  check('subjects')
    .optional()
    .isArray()
    .withMessage('Subjects must be an array')
    .custom((subjects) => {
      if (subjects && subjects.length === 0) {
        throw new Error('At least one subject must be selected');
      }
      return true;
    }),

  check('subjects.*')
    .optional()
    .isMongoId()
    .withMessage('Each subject must be a valid ID'),

  check('classLevel')
    .optional()
    .isMongoId()
    .withMessage('Class level must be a valid ID'),

  check('academicYear')
    .optional()
    .isMongoId()
    .withMessage('Academic year must be a valid ID'),

  check('academicTerm')
    .optional()
    .isMongoId()
    .withMessage('Academic term must be a valid ID'),

  handleValidationErrors,
];

export const validateStudentDataRequest = [
  check('enrolledSubjects')
    .optional()
    .isArray()
    .withMessage('Enrolled subjects must be an array'),

  check('enrolledSubjects.*')
    .optional()
    .isMongoId()
    .withMessage('Each enrolled subject must be a valid ID'),

  check('classLevel')
    .optional()
    .isMongoId()
    .withMessage('Class level must be a valid ID'),

  check('academicYear')
    .optional()
    .isMongoId()
    .withMessage('Academic year must be a valid ID'),

  check('parentContact.name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Parent name must be between 2 and 100 characters'),

  check('parentContact.email')
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Parent email must be a valid email address'),

  check('parentContact.phone')
    .optional()
    .trim()
    .isMobilePhone('any')
    .withMessage('Parent phone must be a valid phone number'),

  check('graduationDate')
    .optional()
    .isISO8601()
    .withMessage('Graduation date must be a valid date')
    .custom((value, { req }) => {
      const graduationDate = new Date(value);
      const enrollmentDate = req.body.enrollmentDate
        ? new Date(req.body.enrollmentDate)
        : new Date();
      if (graduationDate <= enrollmentDate) {
        throw new Error('Graduation date must be after enrollment date');
      }
      return true;
    }),

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

// Validation for user status updates (admin only)
export const validateUserStatusRequest = [
  check('status')
    .isIn(['active', 'inactive', 'suspended'])
    .withMessage('Status must be active, inactive, or suspended'),

  check('reason')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Reason must be between 10 and 500 characters'),

  handleValidationErrors,
];

// Validation for Google OAuth signup
export const validateGoogleSignUpRequest = [
  check('googleId').notEmpty().withMessage('Google ID is required'),

  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please provide a valid email address'),

  check('role')
    .optional()
    .isIn(['educator', 'admin', 'student', 'stakeholder', 'researcher'])
    .withMessage('Invalid role specified'),

  handleValidationErrors,
];

// Validation for bulk operations
export const validateBulkUserRequest = [
  check('userIds')
    .isArray({ min: 1 })
    .withMessage('At least one user ID is required'),

  check('userIds.*').isMongoId().withMessage('Each user ID must be valid'),

  check('action')
    .isIn(['activate', 'deactivate', 'suspend', 'delete'])
    .withMessage('Invalid bulk action'),

  check('reason')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Reason must be between 10 and 500 characters'),

  handleValidationErrors,
];

// Validation for search/filter requests
export const validateUserSearchRequest = [
  check('role')
    .optional()
    .isIn(['educator', 'admin', 'student', 'stakeholder', 'researcher'])
    .withMessage('Invalid role filter'),

  check('status')
    .optional()
    .isIn(['active', 'inactive', 'suspended'])
    .withMessage('Invalid status filter'),

  check('search')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search term must be between 2 and 100 characters'),

  check('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  check('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  check('sortBy')
    .optional()
    .isIn(['name', 'email', 'createdAt', 'lastLogin', 'role'])
    .withMessage('Invalid sort field'),

  check('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),

  handleValidationErrors,
];

// Parameter validation for routes with IDs
export const validateUserIdParam = [
  param('id').isMongoId().withMessage('Invalid user ID format'),
  handleValidationErrors,
];

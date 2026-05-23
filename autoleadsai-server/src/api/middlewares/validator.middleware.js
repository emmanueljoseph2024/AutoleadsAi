import { body, param, query, validationResult } from 'express-validator';

// Centralized error handler for validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// ─── Auth Validations ─────────────────────────────────

export const registerValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name must be at most 50 characters'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name must be at most 50 characters'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  handleValidationErrors,
];

export const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),

  handleValidationErrors,
];

// ─── User Validations ─────────────────────────────────

export const updateProfileValidation = [
  body('firstName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('First name cannot be empty')
    .isLength({ max: 50 }),

  body('lastName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Last name cannot be empty')
    .isLength({ max: 50 }),

  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL'),

  handleValidationErrors,
];

export const updatePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),

  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters'),

  handleValidationErrors,
];

// ─── Lead Validations ─────────────────────────────────

export const leadValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),

  body('name')
    .optional()
    .trim(),

  body('company')
    .optional()
    .trim(),

  body('source')
    .optional()
    .isIn(['linkedin', 'facebook', 'reddit', 'twitter', 'instagram', 'website', 'google_maps', 'news', 'manual', 'api', 'other'])
    .withMessage('Invalid source'),

  body('sourceUrl')
    .optional()
    .isURL()
    .withMessage('Source URL must be valid'),

  handleValidationErrors,
];

// ─── Scan Validations ─────────────────────────────────

export const scanValidation = [
  body('sources')
    .isArray({ min: 1 })
    .withMessage('At least one source is required'),

  body('sources.*')
    .isIn(['linkedin', 'facebook', 'reddit', 'twitter', 'instagram', 'website', 'google_maps', 'news', 'apollo'])
    .withMessage('Invalid source specified'),

  handleValidationErrors,
];

// ─── Workflow Validations ─────────────────────────────

export const workflowValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Workflow name is required')
    .isLength({ max: 100 }),

  body('trigger.type')
    .isIn(['new_lead', 'lead_scored', 'manual'])
    .withMessage('Invalid trigger type'),

  body('steps')
    .isArray({ min: 1 })
    .withMessage('At least one step is required'),

  body('steps.*.type')
    .isIn(['scoring', 'filter', 'email', 'crm_sync', 'slack_alert', 'delay', 'condition'])
    .withMessage('Invalid step type'),

  body('steps.*.order')
    .isInt({ min: 0 })
    .withMessage('Each step must have a valid order'),

  handleValidationErrors,
];
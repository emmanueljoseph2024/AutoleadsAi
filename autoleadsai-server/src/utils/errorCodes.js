export const ERROR_CODES = {
  // ─── Auth Errors ──────────────────────────────────
  AUTH_INVALID_CREDENTIALS: {
    code: 'AUTH_001',
    message: 'Invalid email or password',
    status: 401,
  },
  AUTH_TOKEN_EXPIRED: {
    code: 'AUTH_002',
    message: 'Token has expired',
    status: 401,
  },
  AUTH_TOKEN_INVALID: {
    code: 'AUTH_003',
    message: 'Invalid token',
    status: 401,
  },
  AUTH_EMAIL_EXISTS: {
    code: 'AUTH_004',
    message: 'Email already registered',
    status: 409,
  },
  AUTH_UNAUTHORIZED: {
    code: 'AUTH_005',
    message: 'Not authenticated',
    status: 401,
  },
  AUTH_FORBIDDEN: {
    code: 'AUTH_006',
    message: 'Access denied',
    status: 403,
  },
  AUTH_ACCOUNT_INACTIVE: {
    code: 'AUTH_007',
    message: 'Account deactivated',
    status: 403,
  },
  AUTH_PASSWORD_WEAK: {
    code: 'AUTH_008',
    message: 'Password does not meet strength requirements',
    status: 400,
  },

  // ─── Resource Errors ──────────────────────────────
  RESOURCE_NOT_FOUND: {
    code: 'RES_001',
    message: 'Resource not found',
    status: 404,
  },
  RESOURCE_ALREADY_EXISTS: {
    code: 'RES_002',
    message: 'Resource already exists',
    status: 409,
  },
  RESOURCE_DELETED: {
    code: 'RES_003',
    message: 'Resource has been deleted',
    status: 410,
  },

  // ─── Validation Errors ────────────────────────────
  VALIDATION_FAILED: {
    code: 'VAL_001',
    message: 'Validation failed',
    status: 400,
  },
  VALIDATION_MISSING_FIELD: {
    code: 'VAL_002',
    message: 'Required field is missing',
    status: 400,
  },
  VALIDATION_INVALID_FORMAT: {
    code: 'VAL_003',
    message: 'Invalid format',
    status: 400,
  },

  // ─── Subscription Errors ──────────────────────────
  SUBSCRIPTION_NOT_FOUND: {
    code: 'SUB_001',
    message: 'No active subscription',
    status: 402,
  },
  SUBSCRIPTION_LIMIT_REACHED: {
    code: 'SUB_002',
    message: 'Tier limit reached',
    status: 429,
  },
  SUBSCRIPTION_PAST_DUE: {
    code: 'SUB_003',
    message: 'Payment past due',
    status: 402,
  },
  SUBSCRIPTION_TIER_INSUFFICIENT: {
    code: 'SUB_004',
    message: 'Feature not available on current tier',
    status: 403,
  },
  SUBSCRIPTION_TRIAL_EXPIRED: {
    code: 'SUB_005',
    message: 'Trial has expired',
    status: 402,
  },

  // ─── Rate Limiting ────────────────────────────────
  RATE_LIMIT_EXCEEDED: {
    code: 'RATE_001',
    message: 'Too many requests',
    status: 429,
  },

  // ─── Scan Errors ──────────────────────────────────
  SCAN_IN_PROGRESS: {
    code: 'SCAN_001',
    message: 'A scan is already in progress',
    status: 409,
  },
  SCAN_SOURCE_INVALID: {
    code: 'SCAN_002',
    message: 'Invalid scan source',
    status: 400,
  },
  SCAN_FAILED: {
    code: 'SCAN_003',
    message: 'Scan failed',
    status: 500,
  },

  // ─── Integration Errors ───────────────────────────
  INTEGRATION_NOT_CONFIGURED: {
    code: 'INT_001',
    message: 'Integration not configured',
    status: 400,
  },
  INTEGRATION_FAILED: {
    code: 'INT_002',
    message: 'Integration request failed',
    status: 502,
  },

  // ─── Server Errors ────────────────────────────────
  INTERNAL_ERROR: {
    code: 'SRV_001',
    message: 'Internal server error',
    status: 500,
  },
  SERVICE_UNAVAILABLE: {
    code: 'SRV_002',
    message: 'Service temporarily unavailable',
    status: 503,
  },
  DATABASE_ERROR: {
    code: 'SRV_003',
    message: 'Database error',
    status: 500,
  },
};
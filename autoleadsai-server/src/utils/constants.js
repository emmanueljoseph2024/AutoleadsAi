// ─── Rate Limiting ──────────────────────────────────
export const RATE_LIMITS = {
  GLOBAL: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
  AUTH: {
    windowMs: 15 * 60 * 1000,
    max: 20,
  },
  SCAN: {
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
  },
  API: {
    windowMs: 1 * 60 * 1000,
    max: 60,
  },
};

// ─── Pagination ─────────────────────────────────────
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 50,
  MAX_LIMIT: 500,
};

// ─── Lead Sources ───────────────────────────────────
export const LEAD_SOURCES = [
  'linkedin',
  'facebook',
  'reddit',
  'twitter',
  'instagram',
  'website',
  'google_maps',
  'news',
  'apollo',
  'manual',
  'api',
  'other',
];

// ─── Lead Statuses ──────────────────────────────────
export const LEAD_STATUSES = [
  'new',
  'scored',
  'qualified',
  'contacted',
  'replied',
  'converted',
  'disqualified',
];

// ─── Lead Qualifications ────────────────────────────
export const LEAD_QUALIFICATIONS = ['hot', 'warm', 'cold'];

// ─── Subscription Tiers ─────────────────────────────
export const SUBSCRIPTION_TIERS = ['starter', 'pro', 'scale'];

// ─── Subscription Statuses ──────────────────────────
export const SUBSCRIPTION_STATUSES = [
  'trialing',
  'active',
  'past_due',
  'canceled',
  'paused',
  'inactive',
];

// ─── User Roles ─────────────────────────────────────
export const USER_ROLES = ['user', 'admin'];

// ─── Team Roles ─────────────────────────────────────
export const TEAM_ROLES = ['admin', 'member', 'viewer'];

// ─── Email Types ────────────────────────────────────
export const EMAIL_TYPES = [
  'initial',
  'follow_up_1',
  'follow_up_2',
  'follow_up_3',
  'follow_up_4',
  'follow_up_5',
  'manual',
];

// ─── Email Statuses ─────────────────────────────────
export const EMAIL_STATUSES = [
  'sent',
  'delivered',
  'opened',
  'clicked',
  'bounced',
  'complained',
  'replied',
];

// ─── Nurture Statuses ───────────────────────────────
export const NURTURE_STATUSES = [
  'active',
  'paused',
  'conversation',
  'converted',
  'closed_lost',
  'closed_spam',
  'unsubscribed',
];

// ─── AI Insight Types ───────────────────────────────
export const AI_INSIGHT_TYPES = [
  'lead_analysis',
  'approach_strategy',
  'message_template',
  'category_analysis',
  'niche_trends',
  'conversion_tips',
  'objection_handler',
];

// ─── Message Template Types ─────────────────────────
export const MESSAGE_TEMPLATE_TYPES = [
  'initial_contact',
  'follow_up',
  'value_pitch',
  'objection_response',
  'closing',
];

// ─── Tone Options ───────────────────────────────────
export const TONES = ['formal', 'casual', 'friendly', 'professional', 'direct'];

// ─── Platform Types ─────────────────────────────────
export const PLATFORMS = [
  'linkedin',
  'facebook',
  'reddit',
  'twitter',
  'instagram',
  'email',
  'other',
];

// ─── CRM Providers ──────────────────────────────────
export const CRM_PROVIDERS = ['hubspot', 'salesforce', 'zoho', 'pipedrive', 'custom'];

// ─── Currency ───────────────────────────────────────
export const CURRENCIES = ['USD', 'EUR', 'GBP', 'NGN'];

// ─── Trial ──────────────────────────────────────────
export const TRIAL_DURATION_DAYS = 14;

// ─── Cache ──────────────────────────────────────────
export const CACHE_TTL = {
  DASHBOARD: 300,   // 5 minutes
  PIPELINE: 300,
  DEDUP: 3600,      // 1 hour
  SESSION: 86400,   // 24 hours
};

// ─── Token Expiry ───────────────────────────────────
export const TOKEN_EXPIRY = {
  ACCESS: '15m',
  REFRESH: '7d',
  PASSWORD_RESET: '1h',
};
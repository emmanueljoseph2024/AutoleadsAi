export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  LEADS: {
    BASE: '/leads',
    BY_ID: (id: string) => `/leads/${id}`,
    BULK: '/leads/bulk',
  },
  SCANS: {
    BASE: '/scans',
    TRIGGER: '/scans/trigger',
    BY_ID: (id: string) => `/scans/${id}`,
    CANCEL: (id: string) => `/scans/${id}/cancel`,
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    PIPELINE: '/dashboard/pipeline',
    RECENT_LEADS: '/dashboard/recent-leads',
    ACTIVITY: '/dashboard/activity',
    EMAIL_PERFORMANCE: '/dashboard/email-performance',
    SCAN_PERFORMANCE: '/dashboard/scan-performance',
    SOURCE_ANALYTICS: '/dashboard/source-analytics',
    NICHES: '/dashboard/niches',
    INVALIDATE_CACHE: '/dashboard/invalidate-cache',
  },
  WORKFLOWS: {
    BASE: '/workflows',
    BY_ID: (id: string) => `/workflows/${id}`,
    TOGGLE: (id: string) => `/workflows/${id}/toggle`,
  },
  NICHES: {
    BASE: '/niches',
    BY_ID: (id: string) => `/niches/${id}`,
  },
  BILLING: {
    PLANS: '/billing/plans',
    CHECKOUT: '/billing/checkout',
    PORTAL: '/billing/portal',
    INVOICES: '/billing/invoices',
    CANCEL: '/billing/cancel',
  },
  MESSAGES: {
    BASE: '/messages',
    GENERATE: '/messages/generate',
    BY_ID: (id: string) => `/messages/${id}`,
  },
  CONVERSATIONS: {
    BASE: '/conversations',
    BY_ID: (id: string) => `/conversations/${id}`,
    REPLY: (id: string) => `/conversations/${id}/reply`,
  },
  SETTINGS: {
    PROFILE: '/users/me',
    PASSWORD: '/users/me/password',
    API_KEYS: '/api-keys',
    SLACK: '/integrations/slack',
    CRM: '/integrations/crm',
    AI_AGENT: '/integrations/ai-agent',
  },
  WEBHOOKS: {
    N8N: '/webhooks/n8n',
    PADDLE: '/webhooks/paddle',
  },
} as const;
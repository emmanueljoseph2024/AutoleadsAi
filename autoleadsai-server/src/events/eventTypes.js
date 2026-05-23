// Centralised event name constants to avoid typos

export const EVENT_TYPES = {
  // Lead events
  LEAD_DISCOVERED: 'lead.discovered',
  LEAD_SCORED: 'lead.scored',
  LEAD_ENRICHED: 'lead.enriched',
  LEAD_QUALIFIED_HOT: 'lead.qualified.hot',
  LEAD_QUALIFIED_WARM: 'lead.qualified.warm',
  LEAD_DISQUALIFIED: 'lead.disqualified',
  LEAD_CONVERTED: 'lead.converted',

  // Email events
  EMAIL_SENT: 'email.sent',
  EMAIL_DELIVERED: 'email.delivered',
  EMAIL_OPENED: 'email.opened',
  EMAIL_CLICKED: 'email.clicked',
  EMAIL_BOUNCED: 'email.bounced',
  EMAIL_REPLIED: 'email.replied',

  // Scan events
  SCAN_STARTED: 'scan.started',
  SCAN_COMPLETED: 'scan.completed',
  SCAN_FAILED: 'scan.failed',
  SCAN_CANCELLED: 'scan.cancelled',

  // Workflow events
  WORKFLOW_TRIGGERED: 'workflow.triggered',
  WORKFLOW_STEP_COMPLETED: 'workflow.step.completed',
  WORKFLOW_COMPLETED: 'workflow.completed',
  WORKFLOW_FAILED: 'workflow.failed',

  // CRM events
  CRM_SYNCED: 'crm.synced',
  CRM_SYNC_FAILED: 'crm.sync.failed',

  // Notification events
  SLACK_NOTIFICATION_SENT: 'slack.notification.sent',
  SLACK_NOTIFICATION_FAILED: 'slack.notification.failed',

  // User events
  USER_SIGNUP: 'user.signup',
  USER_LOGIN: 'user.login',
  USER_DELETED: 'user.deleted',

  // Subscription events
  SUBSCRIPTION_CREATED: 'subscription.created',
  SUBSCRIPTION_UPDATED: 'subscription.updated',
  SUBSCRIPTION_CANCELED: 'subscription.canceled',
  SUBSCRIPTION_PAST_DUE: 'subscription.past_due',
  SUBSCRIPTION_RESUMED: 'subscription.resumed',
  TRIAL_ENDING: 'trial.ending',
  TRIAL_EXPIRED: 'trial.expired',

  // Payment events
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',
  INVOICE_PAID: 'invoice.paid',

  // System events
  ERROR_OCCURRED: 'error.occurred',
  RATE_LIMIT_HIT: 'rate.limit.hit',
  HEALTH_CHECK_FAILED: 'health.check.failed',
};
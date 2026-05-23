import { eventBus } from './eventBus.js';
import { EVENT_TYPES } from './eventTypes.js';
import { logger } from '../utils/logger.js';
import { Lead, EmailLog, Scan, Workflow, EventLog, User } from '../models/index.js';
import { enqueueEmail, enqueueSlackNotification, enqueueCrmSync } from '../queues/index.js';

// ───────────────────────────────────────────────────
// Lead handlers
// ───────────────────────────────────────────────────

const handleLeadDiscovered = async (payload) => {
  logger.info(`New leads discovered: ${payload.count || 0}`);
  // The worker already stores leads, this is for logging/analytics
};

const handleLeadScored = async (payload) => {
  logger.info(`Lead scored: ${payload.leadId}`);
  // Trigger next step in workflow if configured
};

const handleLeadQualifiedHot = async (payload) => {
  logger.info(`Hot lead qualified: ${payload.leadId}`);
  // Trigger email outreach, Slack alert, and CRM sync
  await enqueueEmail(payload.leadId, 'initial');
  await enqueueSlackNotification(payload.leadId, 'hot_lead');
  await enqueueCrmSync(payload.leadId);
};

// ───────────────────────────────────────────────────
// Email handlers
// ───────────────────────────────────────────────────

const handleEmailSent = async (payload) => {
  logger.info(`Email sent to lead: ${payload.leadId}`);
};

const handleEmailOpened = async (payload) => {
  logger.info(`Email opened by lead: ${payload.leadId}`);
  await Lead.findByIdAndUpdate(payload.leadId, { lastContactedAt: new Date() });
};

const handleEmailReplied = async (payload) => {
  logger.info(`Email replied by lead: ${payload.leadId}`);
  await Lead.findByIdAndUpdate(payload.leadId, {
    status: 'replied',
    lastContactedAt: new Date(),
  });
};

// ───────────────────────────────────────────────────
// Scan handlers
// ───────────────────────────────────────────────────

const handleScanStarted = async (payload) => {
  await Scan.findByIdAndUpdate(payload.scanId, {
    status: 'running',
    startedAt: new Date(),
  });
};

const handleScanCompleted = async (payload) => {
  await Scan.findByIdAndUpdate(payload.scanId, {
    status: 'completed',
    completedAt: new Date(),
    totalFound: payload.totalFound || 0,
    newLeads: payload.newLeads || 0,
  });
};

const handleScanFailed = async (payload) => {
  await Scan.findByIdAndUpdate(payload.scanId, {
    status: 'failed',
    errorLog: payload.errors || ['Unknown error'],
  });
};

// ───────────────────────────────────────────────────
// Subscription handlers
// ───────────────────────────────────────────────────

const handleTrialEnding = async (payload) => {
  const { userId, daysRemaining } = payload;
  logger.info(`Trial ending for user ${userId} in ${daysRemaining} days`);
  // Could trigger an email notification to the user
};

const handleTrialExpired = async (payload) => {
  const { userId } = payload;
  await User.findByIdAndUpdate(userId, {
    'subscription.status': 'canceled',
  });
  logger.info(`Trial expired for user: ${userId}`);
};

// ───────────────────────────────────────────────────
// System handlers
// ───────────────────────────────────────────────────

const handleErrorOccurred = async (payload) => {
  logger.error({
    error: payload.error,
    context: payload.context,
  }, `System error occurred`);
};

// ───────────────────────────────────────────────────
// Register all event handlers
// ───────────────────────────────────────────────────

export const registerEventHandlers = () => {
  // Lead events
  eventBus.onEvent(EVENT_TYPES.LEAD_DISCOVERED, handleLeadDiscovered);
  eventBus.onEvent(EVENT_TYPES.LEAD_SCORED, handleLeadScored);
  eventBus.onEvent(EVENT_TYPES.LEAD_QUALIFIED_HOT, handleLeadQualifiedHot);

  // Email events
  eventBus.onEvent(EVENT_TYPES.EMAIL_SENT, handleEmailSent);
  eventBus.onEvent(EVENT_TYPES.EMAIL_OPENED, handleEmailOpened);
  eventBus.onEvent(EVENT_TYPES.EMAIL_REPLIED, handleEmailReplied);

  // Scan events
  eventBus.onEvent(EVENT_TYPES.SCAN_STARTED, handleScanStarted);
  eventBus.onEvent(EVENT_TYPES.SCAN_COMPLETED, handleScanCompleted);
  eventBus.onEvent(EVENT_TYPES.SCAN_FAILED, handleScanFailed);

  // Subscription events
  eventBus.onEvent(EVENT_TYPES.TRIAL_ENDING, handleTrialEnding);
  eventBus.onEvent(EVENT_TYPES.TRIAL_EXPIRED, handleTrialExpired);

  // System events
  eventBus.onEvent(EVENT_TYPES.ERROR_OCCURRED, handleErrorOccurred);

  logger.info('All event handlers registered');
};

// ───────────────────────────────────────────────────
// Helper: log event to database
// ───────────────────────────────────────────────────

export const logEventToDatabase = async (eventType, userId, metadata = {}) => {
  try {
    await EventLog.create({
      userId,
      eventType,
      data: metadata,
    });
  } catch (error) {
    logger.error({ error: error.message }, 'Failed to log event to database');
  }
};
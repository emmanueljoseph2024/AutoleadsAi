// ─── Queue Exports ─────────────────────────────────

export {
  scraperQueue,
  linkedinScrapeQueue,
  websiteScrapeQueue,
  redditScrapeQueue,
  facebookScrapeQueue,
  twitterScrapeQueue,
  enqueueScan,
  enqueueSourceScrape,
} from './scraper.queue.js';

export {
  leadProcessingQueue,
  enqueueLeadScoring,
  enqueueLeadEnrichment,
  enqueueLeadDeduplication,
  enqueueBatchLeadProcessing,
  enqueueWorkflow,
} from './leadProcessing.queue.js';

export {
  emailQueue,
  enqueueEmail,
  enqueueBulkEmails,
  enqueueFollowUp,
} from './email.queue.js';

export {
  followUpQueue,
  enqueueFollowUpCheck,
  enqueueProcessSequence,
} from './followUp.queue.js';

export {
  notificationQueue,
  enqueueSlackNotification,
  enqueueCrmSync,
  enqueueInAppNotification,
} from './notification.queue.js';

export {
  billingQueue,
  enqueueTrialCheck,
  enqueueTrialEndingReminder,
  enqueueSubscriptionSync,
  enqueueInvoiceGeneration,
  enqueuePaymentFailed,
} from './billing.queue.js';

export {
  cleanupQueue,
  enqueueCleanupExpiredTokens,
  enqueueCleanupOldLogs,
  enqueueCleanupInactiveAccounts,
} from './cleanup.queue.js';
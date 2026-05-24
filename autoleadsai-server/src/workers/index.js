import scraperOrchestrator from './scraperOrchestrator.worker.js';
import leadProcessor from './leadProcessor.worker.js';
import followUpWorker from './followUp.worker.js';
import crmSyncWorker from './crmSync.worker.js';
import slackNotifier from './slackNotifier.worker.js';
import billingWorker from './billing.worker.js';
import cleanupWorker from './cleanup.worker.js';
import { logger } from '../utils/logger.js';

// ─── Start all workers ──────────────────────────────

export const startAllWorkers = () => {
  logger.info('Starting all workers...');

  // All workers auto-start when imported (BullMQ handles it)
  // This function exists for explicit initialization and logging

  logger.info(`
    Workers started:
    - Scraper Orchestrator (concurrency: 3)
    - Lead Processor (concurrency: 5)
    - Follow-Up (concurrency: 3)
    - CRM Sync (concurrency: 2)
    - Slack Notifier (concurrency: 2)
    - Billing (concurrency: 1)
    - Cleanup (concurrency: 1)
  `);
};

// ─── Graceful shutdown ──────────────────────────────

export const stopAllWorkers = async () => {
  logger.info('Stopping all workers...');

  const workers = [
    scraperOrchestrator,
    leadProcessor,
    followUpWorker,
    crmSyncWorker,
    slackNotifier,
    billingWorker,
    cleanupWorker,
  ];

  await Promise.all(workers.map((w) => w.close()));
  logger.info('All workers stopped');
};

export {
  scraperOrchestrator,
  leadProcessor,
  followUpWorker,
  crmSyncWorker,
  slackNotifier,
  billingWorker,
  cleanupWorker,
};
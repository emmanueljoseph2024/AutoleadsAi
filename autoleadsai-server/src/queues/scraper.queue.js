import { Queue } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';

const connection = getRedisConnection();

// Main scraper orchestrator queue
export const scraperQueue = new Queue('scraper', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: 100,
    removeOnFail: 200,
  },
});

// Per‑source scrape queues (concurrency controlled via worker)
export const linkedinScrapeQueue = new Queue('scraper:linkedin', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: 'fixed', delay: 10000 },
    removeOnComplete: 50,
  },
});

export const websiteScrapeQueue = new Queue('scraper:website', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: 'fixed', delay: 5000 },
    removeOnComplete: 50,
  },
});

export const redditScrapeQueue = new Queue('scraper:reddit', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 3000 },
    removeOnComplete: 50,
  },
});

export const facebookScrapeQueue = new Queue('scraper:facebook', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: 'fixed', delay: 10000 },
    removeOnComplete: 50,
  },
});

export const twitterScrapeQueue = new Queue('scraper:twitter', {
  connection,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: 'fixed', delay: 10000 },
    removeOnComplete: 50,
  },
});

// ─── Job creators ──────────────────────────────────

export const enqueueScan = async (scanId, userId, sources = []) => {
  await scraperQueue.add('orchestrate_scan', {
    scanId: scanId.toString(),
    userId: userId.toString(),
    sources,
  });
};

export const enqueueSourceScrape = async (source, data) => {
  const sourceQueueMap = {
    linkedin: linkedinScrapeQueue,
    website: websiteScrapeQueue,
    reddit: redditScrapeQueue,
    facebook: facebookScrapeQueue,
    twitter: twitterScrapeQueue,
  };

  const queue = sourceQueueMap[source];
  if (queue) {
    await queue.add(`scrape:${source}`, data);
  }
};
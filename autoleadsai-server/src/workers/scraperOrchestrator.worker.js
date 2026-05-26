import { Worker } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';
import { Lead, Scan, ScanJob, Niche } from '../models/index.js';
import { eventBus, EVENT_TYPES } from '../events/index.js';
import { logger } from '../utils/logger.js';
import { getScraper } from '../scrapers/index.js';
import { generateLinkPreview } from '../services/scraping/linkPreview.service.js';
import { invalidateScanCache } from '../services/cache/cache.service.js';

const connection = getRedisConnection();

const scraperOrchestrator = new Worker(
  'scraper',
  async (job) => {
    const { scanId, userId, sources } = job.data;

    logger.info(`Starting scan ${scanId} for user ${userId}`);

    // Update scan status
    await Scan.findByIdAndUpdate(scanId, { status: 'running', startedAt: new Date() });

    eventBus.emitEvent(EVENT_TYPES.SCAN_STARTED, { scanId, userId });

    let totalFound = 0;
    let newLeads = 0;
    const totalSources = sources.length;
    let completedSources = 0;

    for (const source of sources) {
      try {
        // Update or create scan job
        let scanJob = await ScanJob.findOne({ scanId, source });
        if (!scanJob) {
          scanJob = await ScanJob.create({ userId, scanId, source, status: 'processing' });
        } else {
          scanJob.status = 'processing';
          await scanJob.save();
        }

        const scraper = getScraper(source);
        const criteria = { keywords: ['real estate', 'property'], maxResults: 50 };

        const results = await scraper.scrape(criteria);
        totalFound += results.length;

        for (const result of results) {
          const existingLead = await Lead.findOne({
            userId,
            email: result.email,
            sourceUrl: result.sourceUrl,
          });

          if (!existingLead) {
            // Generate link preview for the source URL
            let linkPreview = null;
            if (result.sourceUrl) {
              try {
                linkPreview = await generateLinkPreview(result.sourceUrl);
              } catch (previewError) {
                logger.warn(`Failed to generate link preview for ${result.sourceUrl}: ${previewError.message}`);
              }
            }

            await Lead.create({
              userId,
              nicheId: job.data.nicheId || null,
              email: result.email || `${result.name?.replace(/\s+/g, '.').toLowerCase()}@unknown.com`,
              name: result.name,
              company: result.company,
              source,
              sourceUrl: result.sourceUrl,
              linkPreview,
              status: 'new',
            });
            newLeads++;
          }
        }

        // Mark scan job as completed
        scanJob.status = 'completed';
        scanJob.resultSummary = { found: results.length, new: newLeads };
        await scanJob.save();

        completedSources++;
        const progress = Math.round((completedSources / totalSources) * 100);

        // Emit real-time progress via WebSocket
        eventBus.emitEvent(EVENT_TYPES.SCAN_PROGRESS, {
          scanId,
          userId,
          source,
          status: 'completed',
          found: results.length,
          newLeads,
          totalFound,
          progress,
          completedSources,
          totalSources,
        });

        logger.info(`Source ${source}: ${results.length} found, ${newLeads} new (${progress}% complete)`);
      } catch (error) {
        logger.error(`Error scraping ${source}:`, error.message);

        completedSources++;
        const progress = Math.round((completedSources / totalSources) * 100);

        await ScanJob.findOneAndUpdate(
          { scanId, source },
          { status: 'failed', errorMessage: error.message }
        );

        // Emit progress even on failure
        eventBus.emitEvent(EVENT_TYPES.SCAN_PROGRESS, {
          scanId,
          userId,
          source,
          status: 'failed',
          error: error.message,
          found: 0,
          newLeads,
          totalFound,
          progress,
          completedSources,
          totalSources,
        });
      }
    }

    // Update scan record
    const finalStatus = completedSources > 0 && totalFound > 0 ? 'completed' : 'failed';

    await Scan.findByIdAndUpdate(scanId, {
      status: finalStatus,
      totalFound,
      newLeads,
      completedAt: new Date(),
    });

    // Update niche stats
    if (job.data.nicheId) {
      await Niche.findByIdAndUpdate(job.data.nicheId, {
        $inc: { totalScans: 1, totalLeads: newLeads },
        lastScanAt: new Date(),
      });
    }

    // Invalidate scan and dashboard cache for this user
    await invalidateScanCache(userId);

    // Emit final scan event
    if (finalStatus === 'completed') {
      eventBus.emitEvent(EVENT_TYPES.SCAN_COMPLETED, {
        scanId,
        userId,
        totalFound,
        newLeads,
        totalSources,
      });
    } else {
      eventBus.emitEvent(EVENT_TYPES.SCAN_FAILED, {
        scanId,
        userId,
        totalFound,
        newLeads,
        error: 'No leads found from any source',
      });
    }
  },
  { connection, concurrency: 3 }
);

logger.info('Scraper Orchestrator Worker started');
export default scraperOrchestrator;
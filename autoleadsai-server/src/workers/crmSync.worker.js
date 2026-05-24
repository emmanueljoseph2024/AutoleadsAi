import { Worker } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';
import { Lead, CrmIntegration } from '../models/index.js';
import { logger } from '../utils/logger.js';
import { eventBus, EVENT_TYPES } from '../events/index.js';

const connection = getRedisConnection();

const crmSyncWorker = new Worker(
  'notification',
  async (job) => {
    const { name, data } = job;

    if (name !== 'sync_crm') return;

    const { leadId } = data;
    logger.info(`Syncing lead ${leadId} to CRM`);

    try {
      const lead = await Lead.findById(leadId).lean();
      if (!lead) throw new Error('Lead not found');

      const integrations = await CrmIntegration.find({
        userId: lead.userId,
        isActive: true,
        syncDirection: { $in: ['export', 'bidirectional'] },
      });

      for (const integration of integrations) {
        // Dynamic import of CRM adapter based on provider
        const adapterModule = await import(
          `../services/crm/${integration.provider}.service.js`
        );

        await adapterModule.default.syncLead(lead, integration.credentials);

        // Update lead with external CRM ID
        if (lead.externalCrmId) {
          await Lead.findByIdAndUpdate(leadId, { externalCrmId: lead.externalCrmId });
        }

        eventBus.emitEvent(EVENT_TYPES.CRM_SYNCED, {
          leadId,
          provider: integration.provider,
        });
      }
    } catch (error) {
      logger.error(`CRM sync failed for lead ${leadId}:`, error);
      eventBus.emitEvent(EVENT_TYPES.CRM_SYNC_FAILED, { leadId, error: error.message });
    }
  },
  { connection, concurrency: 2 }
);

logger.info('CRM Sync Worker started');
export default crmSyncWorker;
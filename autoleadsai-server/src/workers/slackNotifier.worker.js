import { Worker } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';
import { Lead, SlackIntegration } from '../models/index.js';
import { logger } from '../utils/logger.js';
import axios from 'axios';

const connection = getRedisConnection();

const slackNotifier = new Worker(
  'notification',
  async (job) => {
    const { name, data } = job;

    if (name !== 'send_slack') return;

    const { leadId, event } = data;
    logger.info(`Sending Slack notification for lead ${leadId}: ${event}`);

    try {
      const lead = await Lead.findById(leadId).lean();
      if (!lead) throw new Error('Lead not found');

      const integration = await SlackIntegration.findOne({
        userId: lead.userId,
        isActive: true,
      });

      if (!integration) {
        logger.info(`No active Slack integration for user ${lead.userId}`);
        return;
      }

      // Check if this event type is enabled
      if (!integration.events.includes(event)) {
        return;
      }

      const message = formatSlackMessage(lead, event);

      await axios.post(integration.webhookUrl, message, {
        timeout: 10000,
      });

      logger.info(`Slack notification sent for lead ${leadId}`);
    } catch (error) {
      logger.error(`Slack notification failed for lead ${leadId}:`, error);
    }
  },
  { connection, concurrency: 2 }
);

// ─── Format Slack Message ───────────────────────────

const formatSlackMessage = (lead, event) => {
  const colorMap = {
    hot_lead: '#FF0000',
    new_lead: '#36A64F',
    scan_completed: '#439FE0',
    email_opened: '#FFA500',
    email_replied: '#800080',
  };

  const titleMap = {
    hot_lead: '🔥 Hot Lead Detected!',
    new_lead: '📥 New Lead Discovered',
    scan_completed: '✅ Scan Completed',
    email_opened: '👀 Email Opened',
    email_replied: '💬 Lead Replied!',
  };

  return {
    attachments: [
      {
        color: colorMap[event] || '#36A64F',
        title: titleMap[event] || 'Lead Update',
        fields: [
          { title: 'Name', value: lead.name || 'Unknown', short: true },
          { title: 'Company', value: lead.company || 'Unknown', short: true },
          { title: 'Email', value: lead.email || 'N/A', short: true },
          { title: 'Source', value: lead.source, short: true },
          {
            title: 'View Lead',
            value: `${process.env.CLIENT_URL}/leads/${lead._id}`,
            short: false,
          },
        ],
        footer: 'AutoLeads AI',
        ts: Math.floor(Date.now() / 1000),
      },
    ],
  };
};

logger.info('Slack Notifier Worker started');
export default slackNotifier;
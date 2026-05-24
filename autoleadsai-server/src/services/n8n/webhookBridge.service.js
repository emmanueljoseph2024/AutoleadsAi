import { saveAIInsight, saveMessageTemplate, updateNurtureSequence, saveBatchInsights } from './n8nCallback.service.js';
import { logger } from '../../utils/logger.js';

// ─── Main n8n Webhook Handler ───────────────────────

export const handleN8nWebhook = async (req, res) => {
  try {
    const { event, payload } = req.body;

    logger.info(`n8n webhook received: ${event}`);

    switch (event) {
      // AI Insights
      case 'ai.insight.generated':
        await saveAIInsight(payload);
        break;

      case 'ai.batch_insights.generated':
        await saveBatchInsights(payload.insights);
        break;

      // Message Templates
      case 'message.template.generated':
        await saveMessageTemplate(payload);
        break;

      // Nurture Updates
      case 'nurture.email.sent':
      case 'nurture.email.delivered':
      case 'nurture.email.opened':
      case 'nurture.email.replied':
      case 'nurture.email.bounced':
        await updateNurtureSequence(payload);
        break;

      // User Engagement
      case 'user.welcome.sent':
        logger.info(`Welcome email sent to user: ${payload.userId}`);
        break;

      case 'user.reminder.sent':
        logger.info(`Reminder sent to user: ${payload.userId}`);
        break;

      default:
        logger.warn(`Unknown n8n event: ${event}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    logger.error('n8n webhook handler error:', error);
    res.status(500).json({ error: error.message });
  }
};
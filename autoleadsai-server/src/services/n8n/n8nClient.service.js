import axios from 'axios';
import { N8N_API_URL, N8N_WEBHOOK_BASE } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

// ─── Trigger n8n Workflow via Webhook ───────────────

export const triggerN8nWebhook = async (webhookPath, payload) => {
  try {
    const url = `${N8N_WEBHOOK_BASE}/${webhookPath}`;

    const { data } = await axios.post(url, payload, {
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' },
    });

    logger.info(`n8n webhook triggered: ${webhookPath}`);
    return data;
  } catch (error) {
    logger.error(`n8n webhook failed (${webhookPath}):`, error.message);
    throw error;
  }
};

// ─── User Events ────────────────────────────────────

export const triggerWelcomeSequence = async (userId, userEmail, userName) => {
  return triggerN8nWebhook('user-signup', {
    userId: userId.toString(),
    email: userEmail,
    name: userName,
    event: 'user.signup',
  });
};

export const triggerUsageReminder = async (userId, userEmail, daysSinceLastScan) => {
  return triggerN8nWebhook('user-reminder', {
    userId: userId.toString(),
    email: userEmail,
    daysSinceLastScan,
    event: 'user.inactive',
  });
};

// ─── Lead Events ────────────────────────────────────

export const triggerLeadScoring = async (leadId, leadData) => {
  return triggerN8nWebhook('lead-discovered', {
    leadId: leadId.toString(),
    leadData,
    event: 'lead.discovered',
  });
};

export const triggerLeadInsights = async (leadId, leadData) => {
  return triggerN8nWebhook('lead-insights', {
    leadId: leadId.toString(),
    leadData,
    event: 'lead.insights.requested',
  });
};

export const triggerMessageTemplate = async (leadId, platform, leadData) => {
  return triggerN8nWebhook('generate-message', {
    leadId: leadId.toString(),
    platform,
    leadData,
    event: 'message.template.requested',
  });
};

export const triggerCategoryAnalysis = async (scanId, userId, leads) => {
  return triggerN8nWebhook('category-analysis', {
    scanId: scanId.toString(),
    userId: userId.toString(),
    leads,
    event: 'scan.completed',
  });
};

// ─── Nurture Events ─────────────────────────────────

export const triggerNurtureSequence = async (leadId, userId, leadData) => {
  return triggerN8nWebhook('nurture-start', {
    leadId: leadId.toString(),
    userId: userId.toString(),
    leadData,
    event: 'nurture.start',
  });
};

export const triggerNurtureStep = async (sequenceId, stepNumber, leadData) => {
  return triggerN8nWebhook('nurture-step', {
    sequenceId: sequenceId.toString(),
    stepNumber,
    leadData,
    event: 'nurture.step',
  });
};

// ─── Batch Processing ───────────────────────────────

export const triggerBatchLeadInsights = async (leads) => {
  return triggerN8nWebhook('batch-insights', {
    leads,
    event: 'batch.insights',
  });
};
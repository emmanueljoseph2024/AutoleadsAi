import { triggerN8nWebhook } from './n8nClient.service.js';
import { logger } from '../../utils/logger.js';
import {
  Lead,
  User,
  NurtureSequence,
  AIInsight,
  MessageTemplate,
  Conversation,
} from '../../models/index.js';

// ─── Execute Lead Discovery Workflow ────────────────

export const executeLeadDiscovery = async (scanId, userId, leads) => {
  try {
    const user = await User.findById(userId).lean();
    if (!user) throw new Error('User not found');

    logger.info(`Executing lead discovery workflow for scan ${scanId}`);

    return await triggerN8nWebhook('lead-discovery', {
      scanId: scanId.toString(),
      userId: userId.toString(),
      userEmail: user.email,
      userName: `${user.firstName} ${user.lastName}`,
      leads,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Lead discovery workflow failed:', error);
    throw error;
  }
};

// ─── Execute Lead Scoring Workflow ──────────────────

export const executeLeadScoring = async (leadId) => {
  try {
    const lead = await Lead.findById(leadId).lean();
    if (!lead) throw new Error('Lead not found');

    logger.info(`Executing lead scoring workflow for lead ${leadId}`);

    return await triggerN8nWebhook('lead-scoring', {
      leadId: lead._id.toString(),
      userId: lead.userId.toString(),
      leadData: {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        createdAt: lead.createdAt,
      },
      event: 'lead.discovered',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Lead scoring workflow failed for lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Execute Lead Insights Workflow ─────────────────

export const executeLeadInsights = async (leadId) => {
  try {
    const lead = await Lead.findById(leadId).lean();
    if (!lead) throw new Error('Lead not found');

    logger.info(`Executing lead insights workflow for lead ${leadId}`);

    return await triggerN8nWebhook('lead-insights', {
      leadId: lead._id.toString(),
      userId: lead.userId.toString(),
      leadData: {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        intent: lead.intent,
        relevance: lead.relevance,
        qualification: lead.qualification,
        status: lead.status,
      },
      event: 'lead.insights.requested',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Lead insights workflow failed for lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Execute Message Template Generation ────────────

export const executeMessageGeneration = async (leadId, platform, messageType = 'initial_contact') => {
  try {
    const lead = await Lead.findById(leadId).lean();
    if (!lead) throw new Error('Lead not found');

    const user = await User.findById(lead.userId).lean();
    if (!user) throw new Error('User not found');

    logger.info(`Generating ${platform} message template for lead ${leadId}`);

    return await triggerN8nWebhook('generate-message', {
      leadId: lead._id.toString(),
      userId: lead.userId.toString(),
      platform,
      messageType,
      leadData: {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        qualification: lead.qualification,
        intent: lead.intent,
      },
      userContext: {
        name: `${user.firstName} ${user.lastName}`,
        company: user.company || 'AutoLeads AI',
      },
      event: 'message.template.requested',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Message generation workflow failed for lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Execute Category Analysis Workflow ─────────────

export const executeCategoryAnalysis = async (scanId, userId) => {
  try {
    const leads = await Lead.find({ userId, status: 'scored' })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    if (leads.length === 0) {
      logger.warn(`No scored leads found for category analysis (user ${userId})`);
      return null;
    }

    logger.info(`Executing category analysis for scan ${scanId}`);

    return await triggerN8nWebhook('category-analysis', {
      scanId: scanId.toString(),
      userId: userId.toString(),
      leads: leads.map((l) => ({
        _id: l._id.toString(),
        name: l.name,
        email: l.email,
        company: l.company,
        source: l.source,
        qualification: l.qualification,
        intent: l.intent,
        relevance: l.relevance,
      })),
      event: 'scan.completed',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Category analysis workflow failed for scan ${scanId}:`, error);
    throw error;
  }
};

// ─── Execute Nurture Sequence Start ─────────────────

export const executeNurtureStart = async (leadId) => {
  try {
    const lead = await Lead.findById(leadId).lean();
    if (!lead) throw new Error('Lead not found');

    // Only start nurture for hot qualified leads with email
    if (lead.qualification !== 'hot' || !lead.email) {
      logger.info(`Lead ${leadId} doesn't qualify for nurture (qualification: ${lead.qualification})`);
      return null;
    }

    const user = await User.findById(lead.userId).lean();
    if (!user) throw new Error('User not found');

    logger.info(`Starting nurture sequence for lead ${leadId}`);

    // Create nurture sequence record
    const sequence = await NurtureSequence.create({
      userId: lead.userId,
      leadId: lead._id,
      status: 'active',
      maxSteps: 7,
      conversionProbability: 50,
    });

    return await triggerN8nWebhook('nurture-start', {
      sequenceId: sequence._id.toString(),
      leadId: lead._id.toString(),
      userId: lead.userId.toString(),
      leadData: {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        source: lead.source,
        sourceUrl: lead.sourceUrl,
        qualification: lead.qualification,
        intent: lead.intent,
        relevance: lead.relevance,
      },
      userContext: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        company: user.company || '',
      },
      event: 'nurture.start',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Nurture start workflow failed for lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Execute Nurture Step ───────────────────────────

export const executeNurtureStep = async (sequenceId, stepNumber) => {
  try {
    const sequence = await NurtureSequence.findById(sequenceId).lean();
    if (!sequence) throw new Error('Sequence not found');

    const lead = await Lead.findById(sequence.leadId).lean();
    if (!lead) throw new Error('Lead not found');

    // Don't continue if lead has replied or unsubscribed
    if (['conversation', 'converted', 'closed_lost', 'closed_spam', 'unsubscribed'].includes(sequence.status)) {
      logger.info(`Nurture sequence ${sequenceId} is in ${sequence.status} status — skipping step ${stepNumber}`);
      return null;
    }

    logger.info(`Executing nurture step ${stepNumber} for sequence ${sequenceId}`);

    return await triggerN8nWebhook('nurture-step', {
      sequenceId: sequence._id.toString(),
      stepNumber,
      leadId: lead._id.toString(),
      userId: sequence.userId.toString(),
      leadData: {
        name: lead.name,
        email: lead.email,
        company: lead.company,
      },
      conversationHistory: sequence.steps.map((s) => ({
        step: s.stepNumber,
        sent: s.sentAt,
        status: s.status,
      })),
      previousStepStatus: stepNumber > 1 ? sequence.steps[stepNumber - 2]?.status : null,
      event: 'nurture.step',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Nurture step workflow failed for sequence ${sequenceId}:`, error);
    throw error;
  }
};

// ─── Execute AI Conversation Reply ──────────────────

export const executeConversationReply = async (conversationId, messageContent) => {
  try {
    const conversation = await Conversation.findById(conversationId).lean();
    if (!conversation) throw new Error('Conversation not found');

    logger.info(`Executing AI conversation reply for conversation ${conversationId}`);

    return await triggerN8nWebhook('conversation-reply', {
      conversationId: conversation._id.toString(),
      userId: conversation.userId.toString(),
      leadId: conversation.leadId?.toString(),
      platform: conversation.platform,
      inboundMessage: messageContent,
      conversationHistory: conversation.messages.slice(-10).map((m) => ({
        direction: m.direction,
        content: m.content,
        timestamp: m.sentAt || m.createdAt,
      })),
      leadContext: conversation.leadId
        ? await Lead.findById(conversation.leadId).select('name email company qualification').lean()
        : null,
      event: 'conversation.reply.requested',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Conversation reply workflow failed for conversation ${conversationId}:`, error);
    throw error;
  }
};

// ─── Execute Welcome Sequence ───────────────────────

export const executeWelcomeSequence = async (userId) => {
  try {
    const user = await User.findById(userId).lean();
    if (!user) throw new Error('User not found');

    logger.info(`Starting welcome sequence for user ${userId}`);

    return await triggerN8nWebhook('user-welcome', {
      userId: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      tier: user.subscription?.tier || 'starter',
      event: 'user.signup',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Welcome sequence workflow failed for user ${userId}:`, error);
    throw error;
  }
};

// ─── Execute Usage Reminder ─────────────────────────

export const executeUsageReminder = async (userId) => {
  try {
    const user = await User.findById(userId).lean();
    if (!user) throw new Error('User not found');

    // Check last scan date
    const { Scan } = await import('../../models/index.js');
    const lastScan = await Scan.findOne({ userId })
      .sort({ createdAt: -1 })
      .select('createdAt')
      .lean();

    const daysSinceLastScan = lastScan
      ? Math.floor((Date.now() - new Date(lastScan.createdAt).getTime()) / (1000 * 60 * 60 * 24))
      : 999;

    // Only remind if inactive for 5+ days
    if (daysSinceLastScan < 5) {
      logger.info(`User ${userId} is active — skipping reminder`);
      return null;
    }

    logger.info(`Sending usage reminder to user ${userId} (${daysSinceLastScan} days inactive)`);

    return await triggerN8nWebhook('user-reminder', {
      userId: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      daysSinceLastScan,
      event: 'user.inactive',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Usage reminder workflow failed for user ${userId}:`, error);
    throw error;
  }
};

// ─── Execute Batch Lead Insights ────────────────────

export const executeBatchInsights = async (userId, leadIds) => {
  try {
    if (!leadIds || leadIds.length === 0) return null;

    const leads = await Lead.find({ _id: { $in: leadIds }, userId })
      .select('name email company source qualification status intent relevance')
      .lean();

    if (leads.length === 0) return null;

    logger.info(`Executing batch insights for ${leads.length} leads (user ${userId})`);

    return await triggerN8nWebhook('batch-insights', {
      userId: userId.toString(),
      leads: leads.map((l) => ({
        _id: l._id.toString(),
        name: l.name,
        email: l.email,
        company: l.company,
        source: l.source,
        qualification: l.qualification,
        intent: l.intent,
        relevance: l.relevance,
      })),
      event: 'batch.insights',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Batch insights workflow failed for user ${userId}:`, error);
    throw error;
  }
};

// ─── Execute Lead Status Change Workflow ────────────

export const executeStatusChange = async (leadId, oldStatus, newStatus) => {
  try {
    const lead = await Lead.findById(leadId).lean();
    if (!lead) throw new Error('Lead not found');

    logger.info(`Lead ${leadId} status changed: ${oldStatus} → ${newStatus}`);

    // If newly qualified as hot, start nurture
    if (newStatus === 'qualified' && lead.qualification === 'hot') {
      await executeNurtureStart(leadId);
    }

    // If disqualified or converted, pause nurture
    if (['disqualified', 'converted'].includes(newStatus)) {
      await NurtureSequence.updateMany(
        { leadId, status: { $in: ['active', 'conversation'] } },
        { status: newStatus === 'converted' ? 'converted' : 'closed_lost', completedAt: new Date() }
      );
    }

    return await triggerN8nWebhook('lead-status-change', {
      leadId: lead._id.toString(),
      userId: lead.userId.toString(),
      oldStatus,
      newStatus,
      leadData: {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        qualification: lead.qualification,
      },
      event: 'lead.status.changed',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(`Status change workflow failed for lead ${leadId}:`, error);
    throw error;
  }
};
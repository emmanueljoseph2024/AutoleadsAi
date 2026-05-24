import { Lead, AIInsight } from '../../models/index.js';
import { logger } from '../../utils/logger.js';
import { eventBus, EVENT_TYPES } from '../../events/index.js';

// ─── Qualify Lead Based on AI Scores ────────────────

export const qualifyLead = async (leadId, intentScore, relevanceScore) => {
  try {
    const lead = await Lead.findById(leadId);
    if (!lead) throw new Error('Lead not found');

    // Determine qualification based on combined scores
    let qualification;
    const combinedScore = (intentScore + relevanceScore) / 2;

    if (combinedScore >= 80) {
      qualification = 'hot';
    } else if (combinedScore >= 50) {
      qualification = 'warm';
    } else {
      qualification = 'cold';
    }

    // Update lead
    lead.intent.score = intentScore;
    lead.relevance.score = relevanceScore;
    lead.qualification = qualification;
    lead.status = 'qualified';
    await lead.save();

    // Emit appropriate event
    if (qualification === 'hot') {
      eventBus.emitEvent(EVENT_TYPES.LEAD_QUALIFIED_HOT, { leadId: lead._id });
    } else if (qualification === 'warm') {
      eventBus.emitEvent(EVENT_TYPES.LEAD_QUALIFIED_WARM, { leadId: lead._id });
    }

    logger.info(`Lead ${leadId} qualified as ${qualification} (intent: ${intentScore}, relevance: ${relevanceScore})`);
    return lead;
  } catch (error) {
    logger.error(`Failed to qualify lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Update Lead Intent Score ───────────────────────

export const updateIntentScore = async (leadId, score, keywords = [], summary = '') => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      leadId,
      {
        'intent.score': score,
        'intent.keywords': keywords,
        'intent.summary': summary,
      },
      { new: true }
    );

    // Re-qualify after intent update
    if (lead.relevance?.score) {
      await qualifyLead(leadId, score, lead.relevance.score);
    }

    return lead;
  } catch (error) {
    logger.error(`Failed to update intent score for lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Update Lead Relevance Score ────────────────────

export const updateRelevanceScore = async (leadId, score, factors = {}) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      leadId,
      {
        'relevance.score': score,
        'relevance.factors': factors,
      },
      { new: true }
    );

    // Re-qualify after relevance update
    if (lead.intent?.score) {
      await qualifyLead(leadId, lead.intent.score, score);
    }

    return lead;
  } catch (error) {
    logger.error(`Failed to update relevance score for lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Disqualify Lead ────────────────────────────────

export const disqualifyLead = async (leadId, reason = '') => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      leadId,
      {
        status: 'disqualified',
        qualification: 'cold',
      },
      { new: true }
    );

    eventBus.emitEvent(EVENT_TYPES.LEAD_DISQUALIFIED, {
      leadId: lead._id,
      reason,
    });

    logger.info(`Lead ${leadId} disqualified: ${reason}`);
    return lead;
  } catch (error) {
    logger.error(`Failed to disqualify lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Mark Lead as Converted ─────────────────────────

export const convertLead = async (leadId) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      leadId,
      {
        status: 'converted',
        lastContactedAt: new Date(),
      },
      { new: true }
    );

    eventBus.emitEvent(EVENT_TYPES.LEAD_CONVERTED, { leadId: lead._id });

    logger.info(`Lead ${leadId} converted`);
    return lead;
  } catch (error) {
    logger.error(`Failed to convert lead ${leadId}:`, error);
    throw error;
  }
};

// ─── Get Lead Score Breakdown ───────────────────────

export const getLeadScoreBreakdown = async (leadId) => {
  try {
    const lead = await Lead.findById(leadId)
      .select('intent relevance qualification status')
      .lean();

    if (!lead) throw new Error('Lead not found');

    // Get AI insights for this lead
    const insights = await AIInsight.find({ leadId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('type title content keyPoints confidence')
      .lean();

    return {
      leadId: lead._id,
      qualification: lead.qualification,
      status: lead.status,
      scores: {
        intent: {
          score: lead.intent?.score || 0,
          keywords: lead.intent?.keywords || [],
          summary: lead.intent?.summary || '',
        },
        relevance: {
          score: lead.relevance?.score || 0,
          factors: lead.relevance?.factors || {},
        },
        combined: ((lead.intent?.score || 0) + (lead.relevance?.score || 0)) / 2,
      },
      insights,
    };
  } catch (error) {
    logger.error(`Failed to get lead score breakdown for ${leadId}:`, error);
    throw error;
  }
};

// ─── Batch Qualify Leads ────────────────────────────

export const batchQualifyLeads = async (userId, leadIds) => {
  try {
    const leads = await Lead.find({
      _id: { $in: leadIds },
      userId,
      status: { $in: ['new', 'scored'] },
    });

    const results = [];
    for (const lead of leads) {
      const score = (lead.intent?.score || 0) + (lead.relevance?.score || 0) / 2;
      let qualification;
      if (score >= 80) qualification = 'hot';
      else if (score >= 50) qualification = 'warm';
      else qualification = 'cold';

      lead.qualification = qualification;
      lead.status = 'qualified';
      await lead.save();

      results.push({ leadId: lead._id, qualification, score });

      if (qualification === 'hot') {
        eventBus.emitEvent(EVENT_TYPES.LEAD_QUALIFIED_HOT, { leadId: lead._id });
      }
    }

    logger.info(`Batch qualified ${results.length} leads for user ${userId}`);
    return results;
  } catch (error) {
    logger.error(`Failed to batch qualify leads for user ${userId}:`, error);
    throw error;
  }
};
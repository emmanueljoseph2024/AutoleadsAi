// Add to existing n8nCallback.service.js

// ─── Handle Lead Reply (Continue Conversation) ──────

export const handleLeadReply = async (payload) => {
  try {
    const { sequenceId, leadId, replyContent, replySentiment } = payload;

    const sequence = await NurtureSequence.findById(sequenceId);
    if (!sequence) throw new Error('Sequence not found');

    // 1. Switch status to conversation mode
    if (sequence.status === 'active') {
      sequence.status = 'conversation';
      sequence.conversationStartedAt = new Date();
    }

    // 2. Track the reply
    sequence.lastLeadMessage = replyContent;
    sequence.lastLeadMessageAt = new Date();
    sequence.conversationMessageCount += 1;

    // 3. Adjust conversion probability based on sentiment
    if (replySentiment === 'positive') {
      sequence.conversionProbability = Math.min(100, sequence.conversionProbability + 20);
    } else if (replySentiment === 'negative') {
      sequence.conversionProbability = Math.max(0, sequence.conversionProbability - 30);
    }

    await sequence.save();

    // 4. Update the lead record
    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      {
        status: 'replied',
        lastContactedAt: new Date(),
      },
      { new: true }
    ).select('userId name email company').lean();

    // 5. Emit real-time email replied event via WebSocket
    if (updatedLead) {
      eventBus.emitEvent(EVENT_TYPES.EMAIL_REPLIED, {
        leadId,
        userId: updatedLead.userId,
        leadName: updatedLead.name,
        leadEmail: updatedLead.email,
        company: updatedLead.company,
        replyContent,
        replySentiment,
        sequenceId,
        timestamp: new Date().toISOString(),
      });
    }

    // 6. If high conversion probability, alert user
    if (sequence.conversionProbability >= 70) {
      // Trigger Slack notification via queue
      const { enqueueSlackNotification } = await import('../../queues/index.js');
      await enqueueSlackNotification(leadId, 'lead_ready_to_convert');

      // Emit high conversion event
      if (updatedLead) {
        eventBus.emitEvent(EVENT_TYPES.LEAD_QUALIFIED_HOT, {
          leadId,
          userId: updatedLead.userId,
          leadName: updatedLead.name,
          company: updatedLead.company,
          reason: 'high_conversion_probability',
          conversionProbability: sequence.conversionProbability,
        });
      }
    }

    return sequence;
  } catch (error) {
    logger.error('Failed to handle lead reply:', error);
    throw error;
  }
};

// ─── Handle New Conversation Message ────────────────

export const handleNewConversationMessage = async (payload) => {
  try {
    const { userId, conversationId, message, platform } = payload;

    // Find the conversation to get lead context
    const conversation = await Conversation.findById(conversationId)
      .select('leadId status')
      .lean();

    let leadContext = null;
    if (conversation?.leadId) {
      leadContext = await Lead.findById(conversation.leadId)
        .select('name email company qualification')
        .lean();
    }

    // Emit real-time conversation event via WebSocket
    eventBus.emitEvent(EVENT_TYPES.CONVERSATION_NEW_MESSAGE, {
      userId,
      conversationId,
      message,
      platform,
      leadContext,
      timestamp: new Date().toISOString(),
    });

    // If conversation was inactive, reactivate it
    if (conversation && ['closed', 'spam'].includes(conversation.status)) {
      await Conversation.findByIdAndUpdate(conversationId, {
        status: 'active',
        lastActivityAt: new Date(),
      });
    }

    return { success: true };
  } catch (error) {
    logger.error('Failed to handle new conversation message:', error);
    throw error;
  }
};

// ─── Handle Email Opened ────────────────────────────

export const handleEmailOpened = async (payload) => {
  try {
    const { leadId, emailId } = payload;

    const lead = await Lead.findById(leadId)
      .select('userId name email company')
      .lean();

    if (lead) {
      // Emit real-time email opened event via WebSocket
      eventBus.emitEvent(EVENT_TYPES.EMAIL_OPENED, {
        leadId,
        emailId,
        userId: lead.userId,
        leadName: lead.name,
        leadEmail: lead.email,
        company: lead.company,
        timestamp: new Date().toISOString(),
      });
    }

    return { success: true };
  } catch (error) {
    logger.error('Failed to handle email opened:', error);
    throw error;
  }
};
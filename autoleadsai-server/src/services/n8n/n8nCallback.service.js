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
    await Lead.findByIdAndUpdate(leadId, {
      status: 'replied',
      lastContactedAt: new Date(),
    });

    // 5. If high conversion probability, alert user
    if (sequence.conversionProbability >= 70) {
      // Trigger Slack notification via queue
      const { enqueueSlackNotification } = await import('../../queues/index.js');
      await enqueueSlackNotification(leadId, 'lead_ready_to_convert');
    }

    return sequence;
  } catch (error) {
    logger.error('Failed to handle lead reply:', error);
    throw error;
  }
};
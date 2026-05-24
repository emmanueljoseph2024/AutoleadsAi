import mongoose from 'mongoose';

const nurtureStepSchema = new mongoose.Schema(
  {
    stepNumber: { type: Number, required: true },
    delayDays: { type: Number, default: 2 },
    emailSubject: String,
    emailBody: String,
    status: {
      type: String,
      enum: ['pending', 'sent', 'delivered', 'opened', 'replied', 'bounced'],
      default: 'pending',
    },
    sentAt: Date,
    messageId: String,
    aiGenerated: { type: Boolean, default: true },
  },
  { _id: false }
);

const nurtureSequenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: [
        'active',          // Scheduled emails going out
        'paused',          // User manually paused
        'conversation',    // 🔥 Lead replied — AI is chatting live
        'converted',       // Lead agreed to talk/meeting
        'closed_lost',     // Lead said no / bounced
        'closed_spam',     // Marked as spam
        'unsubscribed',    // Lead opted out
      ],
      default: 'active',
    },
    maxSteps: { type: Number, default: 7 },
    currentStep: { type: Number, default: 0 },
    steps: [nurtureStepSchema],

    // 🔥 NEW: Conversation tracking
    conversationStartedAt: Date,
    conversationMessageCount: { type: Number, default: 0 },
    lastLeadMessage: String,
    lastLeadMessageAt: Date,
    aiHandlingMode: {
      type: String,
      enum: ['auto_reply', 'suggest_draft', 'human_only'],
      default: 'auto_reply',
    },

    conversionProbability: { type: Number, min: 0, max: 100 },
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
  },
  { timestamps: true }
);

nurtureSequenceSchema.index({ userId: 1, status: 1 });
nurtureSequenceSchema.index({ leadId: 1 });

const NurtureSequence = mongoose.model('NurtureSequence', nurtureSequenceSchema);
export default NurtureSequence;
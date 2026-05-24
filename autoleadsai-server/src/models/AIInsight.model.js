import mongoose from 'mongoose';

const aiInsightSchema = new mongoose.Schema(
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
      index: true,
    },
    nicheId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Niche',
      index: true,
    },
    type: {
      type: String,
      enum: [
        'lead_analysis',        // Deep analysis of a single lead
        'approach_strategy',    // How to approach this specific lead
        'message_template',     // Ready-to-copy message
        'category_analysis',    // Group-level insights
        'niche_trends',         // Trends within a niche
        'conversion_tips',      // General tips for this lead type
        'objection_handler',    // How to handle common objections
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    suggestedMessage: {
      type: String,
      default: '',
    },
    tone: {
      type: String,
      enum: ['formal', 'casual', 'friendly', 'professional', 'direct'],
      default: 'professional',
    },
    keyPoints: [String],
    leadCategory: {
      type: String,
      enum: ['investor', 'buyer', 'seller', 'agent', 'developer', 'renter', 'unknown'],
      default: 'unknown',
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },
    generatedBy: {
      type: String,
      default: 'n8n-ai',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

aiInsightSchema.index({ userId: 1, type: 1 });
aiInsightSchema.index({ leadId: 1 });
aiInsightSchema.index({ nicheId: 1 });

const AIInsight = mongoose.model('AIInsight', aiInsightSchema);
export default AIInsight;
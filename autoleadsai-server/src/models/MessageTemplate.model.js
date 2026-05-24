import mongoose from 'mongoose';

const messageTemplateSchema = new mongoose.Schema(
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
    platform: {
      type: String,
      enum: ['linkedin', 'facebook', 'reddit', 'twitter', 'instagram', 'email', 'other'],
      required: true,
    },
    type: {
      type: String,
      enum: ['initial_contact', 'follow_up', 'value_pitch', 'objection_response', 'closing'],
      required: true,
    },
    subject: {
      type: String,
      default: '',
    },
    body: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
      enum: ['formal', 'casual', 'friendly', 'professional', 'direct'],
      default: 'professional',
    },
    keyValueProps: [String],
    personalizationHints: [String],
    generatedBy: {
      type: String,
      default: 'n8n-ai',
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    userRating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

messageTemplateSchema.index({ userId: 1, leadId: 1 });
messageTemplateSchema.index({ userId: 1, platform: 1 });

const MessageTemplate = mongoose.model('MessageTemplate', messageTemplateSchema);
export default MessageTemplate;
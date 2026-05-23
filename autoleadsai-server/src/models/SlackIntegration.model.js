import mongoose from 'mongoose';

const slackIntegrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    workspaceName: String,
    channelName: String,
    webhookUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    events: {
      type: [String],
      enum: ['hot_lead', 'new_lead', 'scan_completed', 'email_opened', 'email_replied'],
      default: ['hot_lead'],
    },
  },
  {
    timestamps: true,
  }
);

const SlackIntegration = mongoose.model('SlackIntegration', slackIntegrationSchema);
export default SlackIntegration;
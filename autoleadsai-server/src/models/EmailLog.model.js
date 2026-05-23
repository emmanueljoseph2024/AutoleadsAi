import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
    },
    to: { type: String, required: true },
    from: { type: String, required: true },
    subject: String,
    body: String,
    templateId: String,
    type: {
      type: String,
      enum: ['initial', 'follow_up_1', 'follow_up_2', 'follow_up_3', 'follow_up_4', 'follow_up_5', 'manual'],
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'replied'],
      default: 'sent',
    },
    messageId: String,
    providerResponse: mongoose.Schema.Types.Mixed,
    sentAt: Date,
    deliveredAt: Date,
    openedAt: Date,
    clickedAt: Date,
    repliedAt: Date,
  },
  {
    timestamps: true,
  }
);

emailLogSchema.index({ userId: 1, leadId: 1 });
emailLogSchema.index({ status: 1, sentAt: 1 });

const EmailLog = mongoose.model('EmailLog', emailLogSchema);
export default EmailLog;
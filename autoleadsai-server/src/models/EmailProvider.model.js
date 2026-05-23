import mongoose from 'mongoose';

const emailProviderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    provider: {
      type: String,
      enum: ['sendgrid', 'mailgun', 'smtp', 'gmail', 'outlook'],
      required: true,
    },
    fromEmail: { type: String, required: true },
    fromName: String,
    credentials: mongoose.Schema.Types.Mixed, // encrypted API keys / SMTP config
    isActive: { type: Boolean, default: true },
    dailyLimit: { type: Number, default: 1000 },
    sentToday: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

emailProviderSchema.index({ userId: 1, isActive: 1 });

const EmailProvider = mongoose.model('EmailProvider', emailProviderSchema);
export default EmailProvider;
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    paddleCustomerId: { type: String, index: true },
    paddleSubscriptionId: { type: String, unique: true, index: true },
    tier: {
      type: String,
      enum: ['starter', 'pro', 'scale'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'past_due', 'canceled', 'paused', 'trialing'],
      default: 'active',
    },
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    canceledAt: Date,
    cancelEffectiveAt: Date,
    trialStart: Date,
    trialEnd: Date,
    currency: { type: String, default: 'USD' },
    amount: Number, // in smallest currency unit (cents)
    interval: { type: String, enum: ['month', 'year'] },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
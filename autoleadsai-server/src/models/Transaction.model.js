import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
    },
    paddleTransactionId: { type: String, unique: true },
    type: {
      type: String,
      enum: ['payment', 'refund', 'credit', 'chargeback'],
    },
    amount: Number,
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['completed', 'pending', 'failed', 'refunded'],
    },
    meta: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

transactionSchema.index({ userId: 1, createdAt: -1 });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
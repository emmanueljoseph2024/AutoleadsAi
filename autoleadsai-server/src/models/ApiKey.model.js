import mongoose from 'mongoose';
import crypto from 'crypto';

const apiKeySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    key: {
      type: String,
      required: true,
      unique: true,
      default: () => crypto.randomBytes(32).toString('hex'),
    },
    prefix: String, // first few characters for display
    permissions: {
      type: [String],
      enum: ['read', 'write', 'admin'],
      default: ['read'],
    },
    lastUsedAt: Date,
    expiresAt: Date,
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

apiKeySchema.index({ userId: 1, isActive: 1 });

const ApiKey = mongoose.model('ApiKey', apiKeySchema);
export default ApiKey;
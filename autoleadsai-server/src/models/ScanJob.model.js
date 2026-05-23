import mongoose from 'mongoose';

const scanJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    scanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scan',
    },
    source: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['queued', 'processing', 'completed', 'failed'],
      default: 'queued',
    },
    jobData: mongoose.Schema.Types.Mixed,
    resultSummary: mongoose.Schema.Types.Mixed,
    attempts: { type: Number, default: 0 },
    maxAttempts: { type: Number, default: 3 },
    errorMessage: String,
  },
  {
    timestamps: true,
  }
);

scanJobSchema.index({ userId: 1, status: 1 });
scanJobSchema.index({ source: 1, status: 1 });

const ScanJob = mongoose.model('ScanJob', scanJobSchema);
export default ScanJob;
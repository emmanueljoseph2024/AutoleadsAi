import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    sources: [
      {
        type: String,
        enum: ['linkedin', 'facebook', 'reddit', 'twitter', 'instagram', 'website', 'google_maps', 'news', 'apollo'],
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'running', 'completed', 'failed', 'cancelled'],
      default: 'pending',
    },
    totalFound: {
      type: Number,
      default: 0,
    },
    newLeads: {
      type: Number,
      default: 0,
    },
    nicheId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Niche',
  index: true,
},
    results: [
      {
        source: String,
        rawData: mongoose.Schema.Types.Mixed,
        leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
      },
    ],
    errorLog: [String],
    startedAt: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
);

scanSchema.index({ userId: 1, createdAt: -1 });

const Scan = mongoose.model('Scan', scanSchema);
export default Scan;
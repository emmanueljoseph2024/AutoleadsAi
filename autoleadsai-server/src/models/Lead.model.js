import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, default: '' },
    company: { type: String, default: '' },
    sourceUrl: { type: String, default: '' },
    source: {
      type: String,
      enum: ['linkedin', 'facebook', 'reddit', 'twitter', 'instagram', 'website', 'google_maps', 'news', 'manual', 'api', 'other'],
      default: 'manual',
    },
    intent: {
      score: { type: Number, default: 0, min: 0, max: 100 },
      keywords: [String],
      summary: String,
    },
    relevance: {
      score: { type: Number, default: 0, min: 0, max: 100 },
      factors: {
        industryMatch: { type: Boolean, default: false },
        roleMatch: { type: Boolean, default: false },
        geoMatch: { type: Boolean, default: false },
      },
    },
    status: {
      type: String,
      enum: ['new', 'scored', 'qualified', 'contacted', 'replied', 'converted', 'disqualified'],
      default: 'new',
      index: true,
    },
    qualification: {
      type: String,
      enum: ['hot', 'warm', 'cold'],
      default: 'cold',
    },
    workflowIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workflow',
      },
    ],
    lastContactedAt: Date,
    emailHistory: [
      {
        emailId: String,
        type: { type: String, enum: ['initial', 'follow_up_1', 'follow_up_2', 'follow_up_3', 'follow_up_4', 'follow_up_5'] },
        sentAt: Date,
        status: { type: String, enum: ['sent', 'delivered', 'opened', 'bounced', 'replied'] },
      },
    ],
    externalCrmId: String,
  },
  {
    timestamps: true,
  }
);

// Compound indexes for multi‑tenant dashboard queries
leadSchema.index({ userId: 1, qualification: 1 });
leadSchema.index({ userId: 1, status: 1 });
leadSchema.index({ userId: 1, createdAt: -1 });
leadSchema.index({ email: 1, userId: 1 }, { unique: true }); // prevent duplicate per user

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
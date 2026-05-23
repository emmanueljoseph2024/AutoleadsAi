import mongoose from 'mongoose';

const crmIntegrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    provider: {
      type: String,
      enum: ['hubspot', 'salesforce', 'zoho', 'pipedrive', 'custom'],
      required: true,
    },
    name: String,
    credentials: mongoose.Schema.Types.Mixed, // encrypted tokens
    isActive: { type: Boolean, default: true },
    syncDirection: {
      type: String,
      enum: ['export', 'import', 'bidirectional'],
      default: 'export',
    },
    lastSyncedAt: Date,
  },
  {
    timestamps: true,
  }
);

crmIntegrationSchema.index({ userId: 1, provider: 1 });

const CrmIntegration = mongoose.model('CrmIntegration', crmIntegrationSchema);
export default CrmIntegration;
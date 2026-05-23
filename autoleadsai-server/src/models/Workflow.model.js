import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['scoring', 'filter', 'email', 'crm_sync', 'slack_alert', 'delay', 'condition'],
      required: true,
    },
    config: { type: mongoose.Schema.Types.Mixed },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const workflowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: '',
      maxlength: 500,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    trigger: {
      type: { type: String, enum: ['new_lead', 'lead_scored', 'manual'] },
      config: mongoose.Schema.Types.Mixed,
    },
    steps: [stepSchema],
    runCount: {
      type: Number,
      default: 0,
    },
    lastRunAt: Date,
  },
  {
    timestamps: true,
  }
);

const Workflow = mongoose.model('Workflow', workflowSchema);
export default Workflow;
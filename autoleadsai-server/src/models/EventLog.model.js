import mongoose from 'mongoose';

const eventLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventType: {
      type: String,
      required: true,
      enum: [
        'lead.discovered',
        'lead.scored',
        'lead.qualified.hot',
        'lead.qualified.warm',
        'email.sent',
        'email.opened',
        'email.replied',
        'lead.crm.synced',
        'slack.notification.sent',
        'scan.started',
        'scan.completed',
        'workflow.triggered',
        'user.signup',
        'subscription.created',
        'subscription.canceled',
      ],
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
    },
    scanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scan',
    },
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workflow',
    },
    data: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

// TTL index: automatically delete events after 30 days
eventLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });
eventLogSchema.index({ userId: 1, eventType: 1 });

const EventLog = mongoose.model('EventLog', eventLogSchema);
export default EventLog;
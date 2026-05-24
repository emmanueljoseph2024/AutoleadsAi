export const validWorkflow = {
  name: 'Hot Lead Outreach',
  description: 'Automatically send emails and Slack alerts for hot leads',
  trigger: {
    type: 'lead_scored',
    config: { qualification: 'hot' },
  },
  steps: [
    { type: 'scoring', config: {}, order: 0 },
    { type: 'filter', config: { qualification: 'hot' }, order: 1 },
    { type: 'email', config: { template: 'initial_outreach' }, order: 2 },
    { type: 'slack_alert', config: { channel: '#hot-leads' }, order: 3 },
    { type: 'crm_sync', config: { action: 'create_contact' }, order: 4 },
  ],
};

export const followUpWorkflow = {
  name: 'Follow-Up Sequence',
  description: 'Send follow-up emails to leads that opened but did not reply',
  trigger: {
    type: 'new_lead',
    config: {},
  },
  steps: [
    { type: 'scoring', config: {}, order: 0 },
    { type: 'delay', config: { days: 2 }, order: 1 },
    { type: 'email', config: { template: 'follow_up_1' }, order: 2 },
    { type: 'delay', config: { days: 3 }, order: 3 },
    { type: 'email', config: { template: 'follow_up_2' }, order: 4 },
    { type: 'delay', config: { days: 5 }, order: 5 },
    { type: 'email', config: { template: 'follow_up_3' }, order: 6 },
  ],
};

export const manualWorkflow = {
  name: 'Manual Review',
  description: 'Requires manual review before sending',
  trigger: {
    type: 'manual',
    config: {},
  },
  steps: [
    { type: 'scoring', config: {}, order: 0 },
    { type: 'condition', config: { condition: 'score > 70' }, order: 1 },
    { type: 'email', config: { template: 'manual_outreach' }, order: 2 },
  ],
};

export const inactiveWorkflow = {
  name: 'Inactive Workflow',
  description: 'This workflow is currently disabled',
  isActive: false,
  trigger: {
    type: 'new_lead',
    config: {},
  },
  steps: [
    { type: 'scoring', config: {}, order: 0 },
  ],
};

// ─── Workflow response shape ─────────────────────────

export const workflowResponseShape = {
  _id: expect.any(String),
  userId: expect.any(String),
  name: expect.any(String),
  description: expect.any(String),
  isActive: expect.any(Boolean),
  trigger: {
    type: expect.any(String),
    config: expect.any(Object),
  },
  steps: expect.any(Array),
  runCount: expect.any(Number),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};
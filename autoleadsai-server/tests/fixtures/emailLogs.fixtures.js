export const sentEmail = {
  to: 'lead@example.com',
  from: 'agent@autoleadsai.com',
  subject: 'Real Estate Opportunity',
  body: 'Hi there,\n\nI noticed you are in the real estate market...',
  type: 'initial',
  status: 'sent',
  sentAt: new Date(),
};

export const deliveredEmail = {
  to: 'lead2@example.com',
  from: 'agent@autoleadsai.com',
  subject: 'Following Up',
  body: 'Just checking in...',
  type: 'follow_up_1',
  status: 'delivered',
  sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  deliveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 5000),
};

export const openedEmail = {
  to: 'lead3@example.com',
  from: 'agent@autoleadsai.com',
  subject: 'Great Opportunity',
  body: 'I wanted to share this with you...',
  type: 'initial',
  status: 'opened',
  sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  deliveredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 3000),
  openedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 60000),
};

export const repliedEmail = {
  to: 'lead4@example.com',
  from: 'agent@autoleadsai.com',
  subject: 'Let\'s Connect',
  body: 'Would you be interested in a quick call?',
  type: 'follow_up_2',
  status: 'replied',
  sentAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  deliveredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 2000),
  openedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 30000),
  repliedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
};

export const bouncedEmail = {
  to: 'invalid@bounce.com',
  from: 'agent@autoleadsai.com',
  subject: 'Hello',
  body: 'Testing...',
  type: 'initial',
  status: 'bounced',
  sentAt: new Date(),
};

export const generateBulkEmailLogs = (userId, count = 30) => {
  const types = ['initial', 'follow_up_1', 'follow_up_2', 'follow_up_3'];
  const statuses = ['sent', 'delivered', 'opened', 'clicked', 'replied', 'bounced'];
  const subjects = [
    'Real Estate Opportunity',
    'Following Up',
    'Quick Question',
    'Thought You Might Be Interested',
    'Let\'s Connect',
  ];

  return Array.from({ length: count }, (_, i) => ({
    userId,
    to: `lead${i + 1}@example.com`,
    from: 'agent@autoleadsai.com',
    subject: subjects[i % subjects.length],
    body: `Email body for lead ${i + 1}...`,
    type: types[i % types.length],
    status: statuses[i % statuses.length],
    sentAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  }));
};
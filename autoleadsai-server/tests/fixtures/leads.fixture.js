import mongoose from 'mongoose';

export const validLead = {
  email: 'lead@example.com',
  name: 'Michael Johnson',
  company: 'Skyline Properties',
  source: 'manual',
  sourceUrl: 'https://linkedin.com/in/michael-johnson',
};

export const linkedinLead = {
  email: 'sarah@realestate.com',
  name: 'Sarah Williams',
  company: 'Urban Realty Group',
  source: 'linkedin',
  sourceUrl: 'https://linkedin.com/in/sarah-williams',
};

export const redditLead = {
  email: '',
  name: 'u/propertyinvestor',
  company: '',
  source: 'reddit',
  sourceUrl: 'https://reddit.com/r/realestate/comments/abc123',
};

export const websiteLead = {
  email: 'info@coastalproperties.com',
  name: 'Coastal Properties',
  company: 'Coastal Properties',
  source: 'website',
  sourceUrl: 'https://coastalproperties.com/contact',
};

export const googleMapsLead = {
  email: '',
  name: 'Metro Development Corp',
  company: 'Metro Development Corp',
  source: 'google_maps',
  sourceUrl: 'https://maps.google.com/place/metro-development',
};

export const hotLead = {
  email: 'hot@example.com',
  name: 'Hot Prospect',
  company: 'Big Deal Inc',
  source: 'linkedin',
  sourceUrl: 'https://linkedin.com/in/hot-prospect',
  qualification: 'hot',
  status: 'qualified',
  intent: { score: 90, keywords: ['buying', 'urgent'], summary: 'Looking to buy immediately' },
  relevance: { score: 85, factors: { industryMatch: true, roleMatch: true, geoMatch: true } },
};

export const warmLead = {
  email: 'warm@example.com',
  name: 'Warm Prospect',
  company: 'Maybe Later LLC',
  source: 'facebook',
  sourceUrl: 'https://facebook.com/warm-prospect',
  qualification: 'warm',
  status: 'scored',
  intent: { score: 60, keywords: ['researching'], summary: 'Researching options' },
  relevance: { score: 55, factors: { industryMatch: true, roleMatch: false, geoMatch: true } },
};

export const coldLead = {
  email: 'cold@example.com',
  name: 'Cold Prospect',
  company: 'Not Interested Corp',
  source: 'twitter',
  sourceUrl: 'https://twitter.com/cold-prospect',
  qualification: 'cold',
  status: 'new',
  intent: { score: 20, keywords: [], summary: 'No clear intent' },
  relevance: { score: 30, factors: { industryMatch: false, roleMatch: false, geoMatch: false } },
};

export const convertedLead = {
  email: 'converted@example.com',
  name: 'Happy Customer',
  company: 'Signed Deal Ltd',
  source: 'linkedin',
  sourceUrl: 'https://linkedin.com/in/happy-customer',
  qualification: 'hot',
  status: 'converted',
  intent: { score: 95, keywords: ['signed', 'closed'], summary: 'Deal closed' },
  relevance: { score: 90, factors: { industryMatch: true, roleMatch: true, geoMatch: true } },
  emailHistory: [
    {
      emailId: 'email_001',
      type: 'initial',
      sentAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      status: 'replied',
    },
    {
      emailId: 'email_002',
      type: 'follow_up_1',
      sentAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: 'replied',
    },
  ],
};

// ─── Bulk leads for seeding ──────────────────────────

export const generateBulkLeads = (userId, count = 50, nicheId = null) => {
  const sources = ['linkedin', 'facebook', 'reddit', 'twitter', 'website', 'google_maps'];
  const qualifications = ['hot', 'warm', 'cold'];
  const statuses = ['new', 'scored', 'qualified', 'contacted'];
  const companies = [
    'Skyline Properties',
    'Urban Realty',
    'Coastal Investments',
    'Metro Development',
    'Golden Gate RE',
  ];
  const names = [
    'Michael Johnson',
    'Sarah Williams',
    'David Brown',
    'Emily Davis',
    'James Wilson',
  ];

  return Array.from({ length: count }, (_, i) => ({
    userId,
    nicheId: nicheId || new mongoose.Types.ObjectId(),
    email: `lead${i + 1}@example.com`,
    name: names[i % names.length],
    company: companies[i % companies.length],
    source: sources[i % sources.length],
    sourceUrl: `https://${sources[i % sources.length]}.com/in/lead-${i + 1}`,
    qualification: qualifications[i % qualifications.length],
    status: statuses[i % statuses.length],
    intent: { score: Math.floor(Math.random() * 100) },
    relevance: { score: Math.floor(Math.random() * 100) },
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  }));
};

// ─── Lead response shape ─────────────────────────────

export const leadResponseShape = {
  _id: expect.any(String),
  email: expect.any(String),
  name: expect.any(String),
  company: expect.any(String),
  source: expect.any(String),
  sourceUrl: expect.any(String),
  sourceMeta: {
    label: expect.any(String),
    icon: expect.any(String),
    color: expect.any(String),
    canChat: expect.any(Boolean),
    chatUrl: null,
  },
  qualification: expect.any(String),
  status: expect.any(String),
  link: expect.stringContaining('/leads/'),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

// ─── Lead list response shape ────────────────────────

export const leadListResponseShape = {
  leads: expect.any(Array),
  total: expect.any(Number),
  page: expect.any(Number),
  pages: expect.any(Number),
};
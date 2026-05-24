export const validNiche = {
  name: 'Miami Real Estate Agents',
  keywords: ['real estate agent', 'realtor', 'property agent'],
  location: 'Miami, FL',
  sources: ['linkedin', 'website', 'google_maps'],
};

export const investorNiche = {
  name: 'Austin Property Investors',
  keywords: ['real estate investor', 'property investment', 'flipping houses'],
  location: 'Austin, TX',
  sources: ['linkedin', 'reddit', 'facebook'],
};

export const developerNiche = {
  name: 'NYC Commercial Developers',
  keywords: ['commercial real estate', 'property developer', 'development firm'],
  location: 'New York, NY',
  sources: ['linkedin', 'website', 'news'],
};

export const inactiveNiche = {
  name: 'Old Niche',
  keywords: ['old', 'inactive'],
  location: 'Nowhere',
  sources: ['linkedin'],
  isActive: false,
};

// ─── Niche response shape ────────────────────────────

export const nicheResponseShape = {
  _id: expect.any(String),
  userId: expect.any(String),
  name: expect.any(String),
  keywords: expect.any(Array),
  location: expect.any(String),
  sources: expect.any(Array),
  isActive: expect.any(Boolean),
  totalScans: expect.any(Number),
  totalLeads: expect.any(Number),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

// ─── Niche overview shape (for dashboard sidebar) ───

export const nicheOverviewShape = {
  _id: expect.any(String),
  name: expect.any(String),
  keywords: expect.any(Array),
  location: expect.any(String),
  sources: expect.any(Array),
  stats: {
    totalLeads: expect.any(Number),
    hotLeads: expect.any(Number),
    totalScans: expect.any(Number),
  },
  lastScanAt: null,
  createdAt: expect.any(String),
};
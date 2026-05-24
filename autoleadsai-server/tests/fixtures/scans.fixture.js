import mongoose from 'mongoose';

export const validScan = {
  sources: ['linkedin', 'website'],
};

export const multiSourceScan = {
  sources: ['linkedin', 'facebook', 'reddit', 'website', 'google_maps'],
};

export const singleSourceScan = {
  sources: ['reddit'],
};

export const completedScan = {
  sources: ['linkedin', 'website'],
  status: 'completed',
  totalFound: 45,
  newLeads: 12,
  startedAt: new Date(Date.now() - 10 * 60 * 1000),
  completedAt: new Date(),
};

export const failedScan = {
  sources: ['linkedin'],
  status: 'failed',
  totalFound: 0,
  newLeads: 0,
  errorLog: ['Rate limited by LinkedIn'],
  startedAt: new Date(Date.now() - 5 * 60 * 1000),
  completedAt: new Date(),
};

export const runningScan = {
  sources: ['facebook', 'twitter'],
  status: 'running',
  startedAt: new Date(),
};

export const generateBulkScans = (userId, count = 10, nicheId = null) => {
  const sourcesList = [
    ['linkedin', 'website'],
    ['reddit', 'facebook'],
    ['linkedin', 'twitter', 'website'],
    ['google_maps'],
    ['linkedin', 'facebook', 'reddit'],
  ];

  return Array.from({ length: count }, (_, i) => ({
    userId,
    nicheId: nicheId || new mongoose.Types.ObjectId(),
    sources: sourcesList[i % sourcesList.length],
    status: i < 8 ? 'completed' : i === 8 ? 'running' : 'failed',
    totalFound: Math.floor(Math.random() * 100) + 10,
    newLeads: Math.floor(Math.random() * 20) + 1,
    startedAt: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000),
    completedAt: i < 8 ? new Date() : null,
  }));
};

// ─── Scan response shape ─────────────────────────────

export const scanResponseShape = {
  _id: expect.any(String),
  userId: expect.any(String),
  sources: expect.any(Array),
  status: expect.any(String),
  totalFound: expect.any(Number),
  newLeads: expect.any(Number),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};
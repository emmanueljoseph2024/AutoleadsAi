import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { logger } from '../src/utils/logger.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// Import models
import User from '../src/models/User.model.js';
import Lead from '../src/models/Lead.model.js';
import Workflow from '../src/models/Workflow.model.js';
import Niche from '../src/models/Niche.model.js';
import Scan from '../src/models/Scan.model.js';
import EmailLog from '../src/models/EmailLog.model.js';

// ─── Seed Data ──────────────────────────────────────

const seedUsers = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'Password123!',
    role: 'user',
    subscription: {
      tier: 'pro',
      status: 'active',
      trialStart: new Date(),
      trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    emailVerified: true,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'Password123!',
    role: 'admin',
    subscription: {
      tier: 'scale',
      status: 'active',
      trialStart: new Date(),
      trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    emailVerified: true,
  },
  {
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@autoleadsai.com',
    password: 'Demo1234!',
    role: 'user',
    subscription: {
      tier: 'starter',
      status: 'trialing',
      trialStart: new Date(),
      trialEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
    emailVerified: true,
  },
];

const seedNiches = [
  {
    name: 'Miami Real Estate Agents',
    keywords: ['real estate agent', 'realtor', 'property agent'],
    location: 'Miami, FL',
    sources: ['linkedin', 'website', 'google_maps'],
    isActive: true,
  },
  {
    name: 'Austin Property Investors',
    keywords: ['real estate investor', 'property investment', 'flipping houses'],
    location: 'Austin, TX',
    sources: ['linkedin', 'reddit', 'facebook'],
    isActive: true,
  },
  {
    name: 'NYC Commercial Developers',
    keywords: ['commercial real estate', 'property developer', 'development firm'],
    location: 'New York, NY',
    sources: ['linkedin', 'website', 'news'],
    isActive: true,
  },
];

const seedWorkflows = [
  {
    name: 'Hot Lead Outreach',
    description: 'Automatically send emails and Slack alerts for hot leads',
    isActive: true,
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
  },
  {
    name: 'Follow-Up Sequence',
    description: 'Send follow-up emails to leads that opened but didn\'t reply',
    isActive: true,
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
    ],
  },
];

const leadCompanies = [
  'Skyline Properties',
  'Urban Realty Group',
  'Coastal Investments',
  'Metro Development Corp',
  'Golden Gate Real Estate',
  'Premier Property Management',
  'Atlas Realty Partners',
  'Summit Holdings',
];

const leadNames = [
  'Michael Johnson',
  'Sarah Williams',
  'David Brown',
  'Emily Davis',
  'James Wilson',
  'Jessica Martinez',
  'Robert Anderson',
  'Amanda Thomas',
];

// ─── Seeder Functions ───────────────────────────────

const seedUsersCollection = async () => {
  logger.info('Seeding users...');
  await User.deleteMany({});

  for (const userData of seedUsers) {
    const user = new User(userData);
    await user.save();
    logger.info(`  Created user: ${user.email}`);
  }

  const users = await User.find();
  logger.info(`Seeded ${users.length} users`);
  return users;
};

const seedNichesCollection = async (users) => {
  logger.info('Seeding niches...');
  await Niche.deleteMany({});

  const niches = [];
  for (let i = 0; i < seedNiches.length; i++) {
    const nicheData = { ...seedNiches[i], userId: users[i % users.length]._id };
    const niche = await Niche.create(nicheData);
    niches.push(niche);
    logger.info(`  Created niche: ${niche.name}`);
  }

  logger.info(`Seeded ${niches.length} niches`);
  return niches;
};

const seedLeadsCollection = async (users, niches) => {
  logger.info('Seeding leads...');
  await Lead.deleteMany({});

  const sources = ['linkedin', 'website', 'reddit', 'facebook', 'google_maps', 'twitter'];
  const qualifications = ['hot', 'warm', 'cold'];
  const statuses = ['new', 'scored', 'qualified', 'contacted'];

  const leads = [];
  for (let i = 0; i < 100; i++) {
    const user = users[i % users.length];
    const niche = niches[i % niches.length];
    const company = leadCompanies[i % leadCompanies.length];
    const name = leadNames[i % leadNames.length];

    const lead = await Lead.create({
      userId: user._id,
      nicheId: niche._id,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      name,
      company,
      source: sources[i % sources.length],
      sourceUrl: `https://${sources[i % sources.length]}.com/in/${name.toLowerCase().replace(/\s+/g, '-')}`,
      qualification: qualifications[i % qualifications.length],
      status: statuses[i % statuses.length],
      intent: {
        score: Math.floor(Math.random() * 100),
        keywords: ['real estate', 'property', 'investment'],
        summary: `${name} is looking for real estate opportunities in the area.`,
      },
      relevance: {
        score: Math.floor(Math.random() * 100),
        factors: {
          industryMatch: Math.random() > 0.5,
          roleMatch: Math.random() > 0.5,
          geoMatch: Math.random() > 0.5,
        },
      },
      emailHistory: [
        {
          emailId: `email_${i}_1`,
          type: 'initial',
          sentAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
          status: ['sent', 'delivered', 'opened'][Math.floor(Math.random() * 3)],
        },
      ],
    });
    leads.push(lead);
  }

  logger.info(`Seeded ${leads.length} leads`);
  return leads;
};

const seedWorkflowsCollection = async (users) => {
  logger.info('Seeding workflows...');
  await Workflow.deleteMany({});

  const workflows = [];
  for (let i = 0; i < seedWorkflows.length; i++) {
    const workflowData = { ...seedWorkflows[i], userId: users[i % users.length]._id };
    const workflow = await Workflow.create(workflowData);
    workflows.push(workflow);
    logger.info(`  Created workflow: ${workflow.name}`);
  }

  logger.info(`Seeded ${workflows.length} workflows`);
  return workflows;
};

const seedScansCollection = async (users, niches) => {
  logger.info('Seeding scans...');
  await Scan.deleteMany({});

  const scans = [];
  for (let i = 0; i < 15; i++) {
    const user = users[i % users.length];
    const niche = niches[i % niches.length];

    const scan = await Scan.create({
      userId: user._id,
      nicheId: niche._id,
      sources: ['linkedin', 'website'],
      status: 'completed',
      totalFound: Math.floor(Math.random() * 50) + 10,
      newLeads: Math.floor(Math.random() * 20) + 1,
      startedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      completedAt: new Date(),
    });
    scans.push(scan);
  }

  logger.info(`Seeded ${scans.length} scans`);
  return scans;
};

const seedEmailLogsCollection = async (users) => {
  logger.info('Seeding email logs...');
  await EmailLog.deleteMany({});

  const logs = [];
  const types = ['initial', 'follow_up_1', 'follow_up_2'];
  const statuses = ['sent', 'delivered', 'opened', 'clicked', 'replied'];

  for (let i = 0; i < 50; i++) {
    const user = users[i % users.length];
    const log = await EmailLog.create({
      userId: user._id,
      to: `lead${i}@example.com`,
      from: `${user.firstName.toLowerCase()}@autoleadsai.com`,
      subject: `Real Estate Opportunity - ${i + 1}`,
      body: `Hi there,\n\nI came across your profile and thought you might be interested...`,
      type: types[i % types.length],
      status: statuses[i % statuses.length],
      sentAt: new Date(Date.now() - Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000),
    });
    logs.push(log);
  }

  logger.info(`Seeded ${logs.length} email logs`);
  return logs;
};

// ─── Main Seeder ────────────────────────────────────

const seedAll = async () => {
  try {
    logger.info('=========================================');
    logger.info('  AutoLeadsAI Database Seeder');
    logger.info('=========================================');

    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/autoleadsai';
    await mongoose.connect(MONGODB_URI);
    logger.info(`Connected to MongoDB: ${MONGODB_URI}`);

    // Run seeders in order
    const users = await seedUsersCollection();
    const niches = await seedNichesCollection(users);
    const leads = await seedLeadsCollection(users, niches);
    const workflows = await seedWorkflowsCollection(users);
    const scans = await seedScansCollection(users, niches);
    const emailLogs = await seedEmailLogsCollection(users);

    logger.info('=========================================');
    logger.info('  Seeding Complete!');
    logger.info('=========================================');
    logger.info(`  Users:     ${users.length}`);
    logger.info(`  Niches:    ${niches.length}`);
    logger.info(`  Leads:     ${leads.length}`);
    logger.info(`  Workflows: ${workflows.length}`);
    logger.info(`  Scans:     ${scans.length}`);
    logger.info(`  Email Logs: ${emailLogs.length}`);
    logger.info('=========================================');
    logger.info('  Demo Login:');
    logger.info('  Email: demo@autoleadsai.com');
    logger.info('  Password: Demo1234!');
    logger.info('=========================================');

    process.exit(0);
  } catch (error) {
    logger.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedAll();
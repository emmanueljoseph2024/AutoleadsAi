import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Workflow from '../../../src/models/Workflow.model.js';

let mongoServer;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  userId = new mongoose.Types.ObjectId();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Workflow.deleteMany({});
});

describe('Workflow Model', () => {
  const validWorkflow = {
    userId,
    name: 'Hot Lead Outreach',
    description: 'Send emails and alerts for hot leads',
    trigger: {
      type: 'lead_scored',
      config: { qualification: 'hot' },
    },
    steps: [
      { type: 'scoring', config: {}, order: 0 },
      { type: 'filter', config: { qualification: 'hot' }, order: 1 },
      { type: 'email', config: { template: 'outreach' }, order: 2 },
    ],
  };

  // ─── Validation ──────────────────────────────────
  describe('Validation', () => {
    test('creates a valid workflow', async () => {
      const workflow = new Workflow(validWorkflow);
      const saved = await workflow.save();

      expect(saved._id).toBeDefined();
      expect(saved.name).toBe(validWorkflow.name);
      expect(saved.description).toBe(validWorkflow.description);
      expect(saved.isActive).toBe(true);
      expect(saved.steps.length).toBe(3);
      expect(saved.runCount).toBe(0);
    });

    test('throws error when userId is missing', async () => {
      const workflow = new Workflow({ ...validWorkflow, userId: undefined });
      await expect(workflow.save()).rejects.toThrow();
    });

    test('throws error when name is missing', async () => {
      const workflow = new Workflow({ ...validWorkflow, name: undefined });
      await expect(workflow.save()).rejects.toThrow('Workflow name is required');
    });

    test('trims whitespace from name', async () => {
      const workflow = new Workflow({ ...validWorkflow, name: '  My Workflow  ' });
      const saved = await workflow.save();
      expect(saved.name).toBe('My Workflow');
    });

    test('throws error when name exceeds 100 characters', async () => {
      const longName = 'A'.repeat(101);
      const workflow = new Workflow({ ...validWorkflow, name: longName });
      await expect(workflow.save()).rejects.toThrow();
    });

    test('accepts empty description', async () => {
      const workflow = new Workflow({ ...validWorkflow, description: '' });
      const saved = await workflow.save();
      expect(saved.description).toBe('');
    });
  });

  // ─── Trigger Validation ──────────────────────────
  describe('Trigger', () => {
    test('accepts valid trigger types', async () => {
      const types = ['new_lead', 'lead_scored', 'manual'];

      for (const type of types) {
        const workflow = new Workflow({
          ...validWorkflow,
          name: `Workflow ${type}`,
          trigger: { type, config: {} },
        });
        const saved = await workflow.save();
        expect(saved.trigger.type).toBe(type);
      }
    });

    test('rejects invalid trigger type', async () => {
      const workflow = new Workflow({
        ...validWorkflow,
        trigger: { type: 'invalid_trigger', config: {} },
      });
      await expect(workflow.save()).rejects.toThrow();
    });
  });

  // ─── Steps Validation ────────────────────────────
  describe('Steps', () => {
    test('accepts valid step types', async () => {
      const validTypes = ['scoring', 'filter', 'email', 'crm_sync', 'slack_alert', 'delay', 'condition'];

      const steps = validTypes.map((type, i) => ({
        type,
        config: {},
        order: i,
      }));

      const workflow = new Workflow({ ...validWorkflow, steps });
      const saved = await workflow.save();
      expect(saved.steps.length).toBe(7);
    });

    test('rejects invalid step type', async () => {
      const workflow = new Workflow({
        ...validWorkflow,
        steps: [{ type: 'invalid_step', config: {}, order: 0 }],
      });
      await expect(workflow.save()).rejects.toThrow();
    });

    test('steps do not have _id (disabled)', async () => {
      const workflow = new Workflow(validWorkflow);
      const saved = await workflow.save();

      saved.steps.forEach((step) => {
        expect(step._id).toBeUndefined();
      });
    });
  });

  // ─── Default Values ──────────────────────────────
  describe('Defaults', () => {
    test('sets isActive to true by default', async () => {
      const workflow = new Workflow(validWorkflow);
      const saved = await workflow.save();
      expect(saved.isActive).toBe(true);
    });

    test('sets runCount to 0 by default', async () => {
      const workflow = new Workflow(validWorkflow);
      const saved = await workflow.save();
      expect(saved.runCount).toBe(0);
    });
  });

  // ─── Indexes ─────────────────────────────────────
  describe('Indexes', () => {
    test('has index on userId', async () => {
      const indexes = await Workflow.collection.indexes();
      const idx = indexes.find((i) => i.key.userId === 1);
      expect(idx).toBeDefined();
    });

    test('has index on isActive', async () => {
      const indexes = await Workflow.collection.indexes();
      const idx = indexes.find((i) => i.key.isActive === 1);
      expect(idx).toBeDefined();
    });
  });
});
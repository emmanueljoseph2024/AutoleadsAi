import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Conversation from '../../../src/models/Conversation.model.js';

let mongoServer;
let userId;
let leadId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  userId = new mongoose.Types.ObjectId();
  leadId = new mongoose.Types.ObjectId();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Conversation.deleteMany({});
});

describe('Conversation Model', () => {
  const validConversation = {
    userId,
    leadId,
    platform: 'facebook',
    platformConversationId: 'fb_conv_12345',
    messages: [
      {
        direction: 'inbound',
        content: 'Hi, I saw your post about real estate. Are you still active?',
        senderName: 'John Prospect',
        senderId: 'fb_user_67890',
        platformMessageId: 'fb_msg_001',
      },
    ],
  };

  // ─── Validation ──────────────────────────────────
  describe('Validation', () => {
    test('creates a valid conversation', async () => {
      const conversation = new Conversation(validConversation);
      const saved = await conversation.save();

      expect(saved._id).toBeDefined();
      expect(saved.platform).toBe(validConversation.platform);
      expect(saved.platformConversationId).toBe(validConversation.platformConversationId);
      expect(saved.status).toBe('active');
      expect(saved.messages.length).toBe(1);
      expect(saved.messages[0].direction).toBe('inbound');
      expect(saved.messages[0].aiGenerated).toBe(false);
      expect(saved.sentiment).toBe('unknown');
      expect(saved.intent).toBe('unknown');
    });

    test('throws error when platform is missing', async () => {
      const conversation = new Conversation({ ...validConversation, platform: undefined });
      await expect(conversation.save()).rejects.toThrow();
    });

    test('throws error when platformConversationId is missing', async () => {
      const conversation = new Conversation({ ...validConversation, platformConversationId: undefined });
      await expect(conversation.save()).rejects.toThrow();
    });

    test('accepts valid platform values', async () => {
      const platforms = ['facebook', 'instagram', 'twitter', 'linkedin'];

      for (const platform of platforms) {
        const conversation = new Conversation({
          ...validConversation,
          platform,
          platformConversationId: `conv_${platform}_123`,
        });
        const saved = await conversation.save();
        expect(saved.platform).toBe(platform);
      }
    });

    test('rejects invalid platform', async () => {
      const conversation = new Conversation({ ...validConversation, platform: 'snapchat' });
      await expect(conversation.save()).rejects.toThrow();
    });

    test('throws error for duplicate platform + platformConversationId', async () => {
      await new Conversation(validConversation).save();
      const duplicate = new Conversation(validConversation);
      await expect(duplicate.save()).rejects.toThrow('duplicate key error');
    });
  });

  // ─── Messages ────────────────────────────────────
  describe('Messages', () => {
    test('stores inbound and outbound messages', async () => {
      const conversation = new Conversation({
        ...validConversation,
        messages: [
          {
            direction: 'inbound',
            content: 'Hello',
            senderName: 'Lead',
            platformMessageId: 'in_001',
          },
          {
            direction: 'outbound',
            content: 'Hi there! How can I help?',
            platformMessageId: 'out_001',
            aiGenerated: true,
            confidence: 90,
          },
        ],
      });
      const saved = await conversation.save();

      expect(saved.messages.length).toBe(2);
      expect(saved.messages[0].direction).toBe('inbound');
      expect(saved.messages[1].direction).toBe('outbound');
      expect(saved.messages[1].aiGenerated).toBe(true);
      expect(saved.messages[1].confidence).toBe(90);
    });

    test('tracks message timestamps', async () => {
      const conversation = new Conversation(validConversation);
      const saved = await conversation.save();

      expect(saved.messages[0].sentAt).toBeDefined();
      expect(saved.messages[0].createdAt).toBeDefined();
    });
  });

  // ─── Status Management ───────────────────────────
  describe('Status', () => {
    test('accepts valid status values', async () => {
      const statuses = ['active', 'waiting', 'human_needed', 'closed', 'spam'];

      for (const status of statuses) {
        const conversation = new Conversation({
          ...validConversation,
          platformConversationId: `conv_${status}_123`,
          status,
        });
        const saved = await conversation.save();
        expect(saved.status).toBe(status);
      }
    });

    test('rejects invalid status', async () => {
      const conversation = new Conversation({ ...validConversation, status: 'unknown' });
      await expect(conversation.save()).rejects.toThrow();
    });

    test('defaults status to active', async () => {
      const conversation = new Conversation(validConversation);
      const saved = await conversation.save();
      expect(saved.status).toBe('active');
    });
  });

  // ─── Sentiment & Intent ──────────────────────────
  describe('Sentiment and Intent', () => {
    test('accepts valid sentiment values', async () => {
      const sentiments = ['positive', 'neutral', 'negative', 'unknown'];

      for (const sentiment of sentiments) {
        const conversation = new Conversation({
          ...validConversation,
          platformConversationId: `conv_${sentiment}_123`,
          sentiment,
        });
        const saved = await conversation.save();
        expect(saved.sentiment).toBe(sentiment);
      }
    });

    test('accepts valid intent values', async () => {
      const intents = ['question', 'interest', 'complaint', 'spam', 'other', 'unknown'];

      for (const intent of intents) {
        const conversation = new Conversation({
          ...validConversation,
          platformConversationId: `conv_${intent}_123`,
          intent,
        });
        const saved = await conversation.save();
        expect(saved.intent).toBe(intent);
      }
    });
  });

  // ─── Indexes ─────────────────────────────────────
  describe('Indexes', () => {
    test('has compound index on userId + status', async () => {
      const indexes = await Conversation.collection.indexes();
      const idx = indexes.find(
        (i) => i.key.userId === 1 && i.key.status === 1
      );
      expect(idx).toBeDefined();
    });

    test('has unique compound index on platform + platformConversationId', async () => {
      const indexes = await Conversation.collection.indexes();
      const idx = indexes.find(
        (i) => i.key.platform === 1 && i.key.platformConversationId === 1 && i.unique === true
      );
      expect(idx).toBeDefined();
    });

    test('has index on leadId', async () => {
      const indexes = await Conversation.collection.indexes();
      const idx = indexes.find((i) => i.key.leadId === 1);
      expect(idx).toBeDefined();
    });
  });
});
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../src/utils/logger.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// ─── Migration Registry ─────────────────────────────

const migrations = [
  {
    version: 1,
    name: 'Add nicheId to leads and scans',
    up: async (db) => {
      logger.info('Migration 1: Adding nicheId to existing leads...');

      // Add nicheId field to leads that don't have it
      const leadResult = await db.collection('leads').updateMany(
        { nicheId: { $exists: false } },
        { $set: { nicheId: null } }
      );
      logger.info(`  Updated ${leadResult.modifiedCount} leads`);

      // Add nicheId field to scans that don't have it
      const scanResult = await db.collection('scans').updateMany(
        { nicheId: { $exists: false } },
        { $set: { nicheId: null } }
      );
      logger.info(`  Updated ${scanResult.modifiedCount} scans`);

      return true;
    },
    down: async (db) => {
      logger.info('Rolling back Migration 1...');
      await db.collection('leads').updateMany({}, { $unset: { nicheId: '' } });
      await db.collection('scans').updateMany({}, { $unset: { nicheId: '' } });
      return true;
    },
  },
  {
    version: 2,
    name: 'Add assignedTo field to leads',
    up: async (db) => {
      logger.info('Migration 2: Adding assignedTo to leads...');

      const result = await db.collection('leads').updateMany(
        { assignedTo: { $exists: false } },
        { $set: { assignedTo: null } }
      );
      logger.info(`  Updated ${result.modifiedCount} leads`);
      return true;
    },
    down: async (db) => {
      logger.info('Rolling back Migration 2...');
      await db.collection('leads').updateMany({}, { $unset: { assignedTo: '' } });
      return true;
    },
  },
  {
    version: 3,
    name: 'Create indexes',
    up: async (db) => {
      logger.info('Migration 3: Creating indexes...');

      await db.collection('leads').createIndex({ userId: 1, qualification: 1 });
      await db.collection('leads').createIndex({ userId: 1, status: 1 });
      await db.collection('leads').createIndex({ userId: 1, createdAt: -1 });
      await db.collection('leads').createIndex({ email: 1, userId: 1 }, { unique: true, sparse: true });
      await db.collection('leads').createIndex({ nicheId: 1 });

      await db.collection('scans').createIndex({ userId: 1, createdAt: -1 });
      await db.collection('scans').createIndex({ nicheId: 1 });

      await db.collection('email_logs').createIndex({ userId: 1, leadId: 1 });
      await db.collection('email_logs').createIndex({ status: 1, sentAt: 1 });

      await db.collection('conversations').createIndex({ userId: 1, status: 1 });
      await db.collection('conversations').createIndex({ platform: 1, platformConversationId: 1 }, { unique: true, sparse: true });

      logger.info('  Indexes created');
      return true;
    },
    down: async (db) => {
      logger.info('Rolling back Migration 3: Dropping indexes...');
      // Index cleanup is optional — usually left in place
      logger.info('  Skipped (indexes are additive)');
      return true;
    },
  },
];

// ─── Migration Tracker ──────────────────────────────

const getMigrationVersion = async (db) => {
  try {
    const collections = await db.listCollections().toArray();
    const trackerExists = collections.some((c) => c.name === 'migrations');

    if (!trackerExists) {
      await db.createCollection('migrations');
      return 0;
    }

    const lastMigration = await db.collection('migrations').findOne(
      {},
      { sort: { version: -1 } }
    );

    return lastMigration ? lastMigration.version : 0;
  } catch (error) {
    logger.error('Failed to get migration version:', error);
    throw error;
  }
};

const recordMigration = async (db, migration, direction) => {
  if (direction === 'up') {
    await db.collection('migrations').insertOne({
      version: migration.version,
      name: migration.name,
      appliedAt: new Date(),
    });
  } else {
    await db.collection('migrations').deleteOne({ version: migration.version });
  }
};

// ─── Main Migration Runner ──────────────────────────

const runMigrations = async (direction = 'up') => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/autoleadsai';
    await mongoose.connect(MONGODB_URI);
    logger.info(`Connected to MongoDB: ${MONGODB_URI}`);

    const db = mongoose.connection.db;
    const currentVersion = await getMigrationVersion(db);

    logger.info('=========================================');
    logger.info(`  AutoLeadsAI Migration Runner`);
    logger.info(`  Direction: ${direction.toUpperCase()}`);
    logger.info(`  Current version: ${currentVersion}`);
    logger.info('=========================================');

    const pendingMigrations =
      direction === 'up'
        ? migrations.filter((m) => m.version > currentVersion).sort((a, b) => a.version - b.version)
        : migrations.filter((m) => m.version <= currentVersion).sort((a, b) => b.version - a.version);

    if (pendingMigrations.length === 0) {
      logger.info('No pending migrations. Database is up to date.');
      process.exit(0);
    }

    for (const migration of pendingMigrations) {
      logger.info(`Running migration ${migration.version}: ${migration.name}`);

      try {
        await migration[direction](db);
        await recordMigration(db, migration, direction);
        logger.info(`  ✓ Migration ${migration.version} completed`);
      } catch (error) {
        logger.error(`  ✗ Migration ${migration.version} failed:`, error);
        process.exit(1);
      }
    }

    const newVersion = await getMigrationVersion(db);
    logger.info('=========================================');
    logger.info(`  Migrations complete!`);
    logger.info(`  New version: ${newVersion}`);
    logger.info('=========================================');

    process.exit(0);
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
};

// ─── Parse Command Line ─────────────────────────────

const args = process.argv.slice(2);
const direction = args[0] === 'down' ? 'down' : 'up';

runMigrations(direction);
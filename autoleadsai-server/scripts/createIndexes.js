import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../src/utils/logger.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// Import all models to register their schemas
import '../src/models/index.js';

// ─── Create All Indexes ─────────────────────────────

const createIndexes = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/autoleadsai';
    await mongoose.connect(MONGODB_URI);
    logger.info(`Connected to MongoDB: ${MONGODB_URI}`);

    logger.info('=========================================');
    logger.info('  Creating Database Indexes');
    logger.info('=========================================');

    const models = mongoose.modelNames();

    for (const modelName of models) {
      const model = mongoose.model(modelName);
      logger.info(`Creating indexes for: ${modelName}`);

      try {
        const result = await model.createIndexes();
        logger.info(`  ✓ Indexes created for ${modelName}`);
        if (result.length > 0) {
          result.forEach((idx) => {
            logger.info(`    - ${JSON.stringify(idx)}`);
          });
        }
      } catch (error) {
        logger.error(`  ✗ Failed for ${modelName}: ${error.message}`);
      }
    }

    logger.info('=========================================');
    logger.info('  Index creation complete!');
    logger.info('=========================================');

    process.exit(0);
  } catch (error) {
    logger.error('Index creation failed:', error);
    process.exit(1);
  }
};

createIndexes();
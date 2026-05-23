import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';
import { MONGODB_URI, NODE_ENV } from './env.js';

export const connectDatabase = async () => {
  try {
    const options = {
      // Mongoose 7+ no longer needs useNewUrlParser / useUnifiedTopology
      autoIndex: NODE_ENV !== 'production', // Don't auto-create indexes in production
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(MONGODB_URI, options);
    logger.info(`MongoDB connected: ${conn.connection.host}`);

    // Connection event handlers
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    logger.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed');
};
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';
import { MONGODB_URI } from './env.js';

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    logger.info(`MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    return conn;
  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
import app from './app.js';
import { logger } from './src/utils/logger.js';
import { PORT } from './src/config/env.js';
import { connectDatabase } from './src/config/db.js';
import { connectRedis, disconnectRedis } from './src/config/redis.js';
import mongoose from 'mongoose';

let server;

const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received. Shutting down gracefully...`);
  try {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      logger.info('HTTP server closed');
    }
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
    await disconnectRedis();
    logger.info('Redis connection closed');
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectDatabase();
    await connectRedis();
    logger.info('All database connections established');

    server = app.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
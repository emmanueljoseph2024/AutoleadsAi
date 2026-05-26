import { createServer } from 'http';
import app from './app.js';
import { logger } from './src/utils/logger.js';
import { PORT } from './src/config/env.js';
import { connectDatabase } from './src/config/db.js';
import { connectRedis, disconnectRedis } from './src/config/redis.js';
import { initializeSocket, getIO } from './src/config/socket.js';
import mongoose from 'mongoose';

let httpServer;

const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received. Shutting down gracefully...`);
  try {
    // Close socket.io first (stops new connections)
    const io = getIO();
    if (io) {
      await new Promise((resolve) => io.close(resolve));
      logger.info('Socket.io server closed');
    }

    // Close HTTP server
    if (httpServer) {
      await new Promise((resolve) => httpServer.close(resolve));
      logger.info('HTTP server closed');
    }

    // Close database connections
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
    // Connect to databases
    await connectDatabase();
    await connectRedis();
    logger.info('All database connections established');

    // Create HTTP server (socket.io needs the raw http server)
    httpServer = createServer(app);

    // Initialize socket.io
    initializeSocket(httpServer);
    logger.info('Socket.io initialized');

    // Start listening
    httpServer.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      logger.info(`WebSocket server ready on port ${PORT}`);
    });

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
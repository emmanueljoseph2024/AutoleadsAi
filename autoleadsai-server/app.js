import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { rateLimiter } from './src/api/middlewares/rateLimiter.middleware.js';
import { errorHandler } from './src/api/middlewares/errorHandler.middleware.js';
import { requestLogger } from './src/api/middlewares/requestLogger.middleware.js';
import { logger } from './src/utils/logger.js';

const app = express();

// Security & parsing
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(requestLogger);

// Global rate limit
app.use(rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes will be mounted here later
// import apiRoutes from './src/api/index.js';
// app.use('/api/v1', apiRoutes);

// Error handling
app.use(errorHandler);

export default app;
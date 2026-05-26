import { Server } from 'socket.io';
import { verifyAccessToken } from '../services/auth/token.service.js';
import { logger } from '../utils/logger.js';
import { eventBus, EVENT_TYPES } from '../events/index.js';

let io = null;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = verifyAccessToken(token);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.userId;

    // Join user-specific room for targeted events
    socket.join(`user:${userId}`);
    logger.info(`User ${userId} connected via WebSocket`);

    // Send initial connection confirmation
    socket.emit('connected', { userId, timestamp: new Date().toISOString() });

    socket.on('disconnect', (reason) => {
      logger.info(`User ${userId} disconnected: ${reason}`);
    });

    socket.on('error', (error) => {
      logger.error(`WebSocket error for user ${userId}:`, error);
    });
  });

  // Forward EventBus events to socket.io
  registerEventForwarding();

  logger.info('Socket.io initialized');
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized. Call initializeSocket first.');
  }
  return io;
};

// Forward internal EventBus events to socket.io rooms
const registerEventForwarding = () => {
  // Lead events
  eventBus.onEvent(EVENT_TYPES.LEAD_DISCOVERED, (payload) => {
    emitToUser(payload.userId, 'lead.discovered', payload);
  });

  eventBus.onEvent(EVENT_TYPES.LEAD_SCORED, (payload) => {
    emitToUser(payload.userId, 'lead.scored', payload);
  });

  eventBus.onEvent(EVENT_TYPES.LEAD_QUALIFIED_HOT, (payload) => {
    emitToUser(payload.userId, 'lead.hot', payload);
  });

  eventBus.onEvent(EVENT_TYPES.LEAD_CONVERTED, (payload) => {
    emitToUser(payload.userId, 'lead.converted', payload);
  });

  // Scan events
  eventBus.onEvent(EVENT_TYPES.SCAN_STARTED, (payload) => {
    emitToUser(payload.userId, 'scan.started', payload);
  });

  eventBus.onEvent(EVENT_TYPES.SCAN_PROGRESS, (payload) => {
    emitToUser(payload.userId, 'scan.progress', payload);
  });

  eventBus.onEvent(EVENT_TYPES.SCAN_COMPLETED, (payload) => {
    emitToUser(payload.userId, 'scan.completed', payload);
  });

  eventBus.onEvent(EVENT_TYPES.SCAN_FAILED, (payload) => {
    emitToUser(payload.userId, 'scan.failed', payload);
  });

  // Email events
  eventBus.onEvent(EVENT_TYPES.EMAIL_SENT, (payload) => {
    emitToUser(payload.userId, 'email.sent', payload);
  });

  eventBus.onEvent(EVENT_TYPES.EMAIL_OPENED, (payload) => {
    emitToUser(payload.userId, 'email.opened', payload);
  });

  eventBus.onEvent(EVENT_TYPES.EMAIL_REPLIED, (payload) => {
    emitToUser(payload.userId, 'email.replied', payload);
  });

  // Conversation events
  eventBus.onEvent(EVENT_TYPES.CONVERSATION_NEW_MESSAGE, (payload) => {
    emitToUser(payload.userId, 'conversation.new', payload);
  });

  // Notification events
  eventBus.onEvent(EVENT_TYPES.NOTIFICATION_CREATED, (payload) => {
    emitToUser(payload.userId, 'notification.new', payload);
  });
};

// Emit event to a specific user's room
const emitToUser = (userId, event, data) => {
  if (!io) return;
  io.to(`user:${userId}`).emit(event, data);
};

// Emit to all connected clients (admin broadcasts)
export const broadcastEvent = (event, data) => {
  if (!io) return;
  io.emit(event, data);
};

// Get connected users count
export const getConnectedUsers = () => {
  if (!io) return 0;
  return io.engine.clientsCount;
};
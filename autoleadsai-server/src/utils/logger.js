import pino from 'pino';
import { LOG_LEVEL, NODE_ENV } from './env.js';

const loggerConfig = {
  level: LOG_LEVEL,
};

// Pretty printing in development
if (NODE_ENV === 'development') {
  loggerConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  };
}

export const loggerConfig = loggerConfig;
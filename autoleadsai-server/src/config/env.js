import dotenv from 'dotenv';

// Load the correct .env file based on NODE_ENV
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

// MongoDB
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/autoleadsai';

// Redis
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// JWT
export const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret-change-me';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-me';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Paddle
export const PADDLE_API_KEY = process.env.PADDLE_API_KEY || '';
export const PADDLE_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET || '';
export const PADDLE_SANDBOX = process.env.PADDLE_SANDBOX === 'true';

// n8n
export const N8N_API_URL = process.env.N8N_API_URL || 'http://localhost:5678';
export const N8N_WEBHOOK_BASE = process.env.N8N_WEBHOOK_BASE || 'http://localhost:5678/webhook';

// Email
export const SMTP_HOST = process.env.SMTP_HOST || 'smtp.mailtrap.io';
export const SMTP_PORT = process.env.SMTP_PORT || 587;
export const SMTP_USER = process.env.SMTP_USER || '';
export const SMTP_PASS = process.env.SMTP_PASS || '';
export const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@autoleadsai.com';
export const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || 'AutoLeads AI';

// Slack
export const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID || '';
export const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET || '';
export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET || '';

// App URLs
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
export const API_URL = process.env.API_URL || `http://localhost:${PORT}`;

// Rate Limiting
export const RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000;
export const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX || 100;

// Logging
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
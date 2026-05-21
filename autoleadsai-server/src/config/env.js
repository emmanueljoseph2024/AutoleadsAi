import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/autoleadsai';
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';
import { CLIENT_URL, NODE_ENV } from './env.js';

const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:5173',   // Vite dev server
  'http://localhost:3000',   // Alternative dev server
  'http://localhost:3001',
];

if (NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:*');
}

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    if (NODE_ENV === 'development' || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  credentials: true,
  maxAge: 86400, // 24 hours
};
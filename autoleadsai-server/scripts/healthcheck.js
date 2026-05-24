import axios from 'axios';

// ─── Configuration ──────────────────────────────────
const API_URL = process.env.API_URL || 'http://localhost:3000';
const HEALTH_ENDPOINT = `${API_URL}/health`;

// ─── Check Services ─────────────────────────────────

const checkMongoDB = async () => {
  try {
    const mongoose = await import('mongoose');
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/autoleadsai';
    await mongoose.default.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    await mongoose.default.connection.close();
    return { status: 'healthy', message: 'MongoDB is reachable' };
  } catch (error) {
    return { status: 'unhealthy', message: `MongoDB error: ${error.message}` };
  }
};

const checkRedis = async () => {
  try {
    const Redis = (await import('ioredis')).default;
    const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
    const redis = new Redis(REDIS_URL, { connectTimeout: 5000 });
    await redis.ping();
    await redis.quit();
    return { status: 'healthy', message: 'Redis is reachable' };
  } catch (error) {
    return { status: 'unhealthy', message: `Redis error: ${error.message}` };
  }
};

const checkAPI = async () => {
  try {
    const response = await axios.get(HEALTH_ENDPOINT, { timeout: 5000 });
    if (response.data.status === 'ok') {
      return { status: 'healthy', message: 'API is responding' };
    }
    return { status: 'degraded', message: 'API returned unexpected response' };
  } catch (error) {
    return { status: 'unhealthy', message: `API error: ${error.message}` };
  }
};

// ─── Main Health Check ──────────────────────────────

const runHealthCheck = async () => {
  console.log('=========================================');
  console.log('  AutoLeadsAI Health Check');
  console.log('  Target: ' + API_URL);
  console.log('=========================================');
  console.log();

  const [mongo, redis, api] = await Promise.all([
    checkMongoDB(),
    checkRedis(),
    checkAPI(),
  ]);

  const results = { mongo, redis, api };

  console.log('Results:');
  console.log(`  MongoDB:  ${mongo.status === 'healthy' ? '✓' : '✗'} ${mongo.message}`);
  console.log(`  Redis:    ${redis.status === 'healthy' ? '✓' : '✗'} ${redis.message}`);
  console.log(`  API:      ${api.status === 'healthy' ? '✓' : '✗'} ${api.message}`);
  console.log();

  const allHealthy = Object.values(results).every((r) => r.status === 'healthy');

  console.log('=========================================');
  console.log(`  Overall: ${allHealthy ? 'HEALTHY' : 'UNHEALTHY'}`);
  console.log('=========================================');

  process.exit(allHealthy ? 0 : 1);
};

runHealthCheck();
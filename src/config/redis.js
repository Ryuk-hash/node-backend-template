const redis = require('redis');
const asyncRedis = require('async-redis');

const config = require('./config');
const logger = require('./logger');

const REDIS_URI = config.redis.uri;

const client = redis.createClient({ url: REDIS_URI });
const asyncRedisClient = asyncRedis.decorate(client);

asyncRedisClient.on('ready', () => {
  logger.info('Redis client now ready.');
});

asyncRedisClient.on('connect', () => {
  logger.info('Redis client connected.');
});

asyncRedisClient.on('error', (err) => {
  logger.error(err);
});

asyncRedisClient.on('reconnecting', ({ delay, attempt }) => {
  logger.warn(`Reconnecting delay: ${delay} |  attempt: ${attempt}`);
});

module.exports = { client, asyncRedisClient };

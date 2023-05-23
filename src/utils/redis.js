/**
 * Set a key value pair in the cache.
 * @param {string} key - Key
 * @param {object} value - Value to be added. Value will be stringified
 */
const setCache = async (key, value) => {
  return await asyncRedisClient.set(`<module_name>:${key}`, JSON.stringify(value));
};

/**
 * Set a key value pair in the cache along with a expiry time.
 * @param {string} key - Key
 * @param {object} value - Value to be added. Value will be stringified
 * @param {number} time - time in seconds
 */
const setCacheExp = async (key, value, time) => {
  return await asyncRedisClient.setEx(`<module_name>:${key}`, time, JSON.stringify(value));
};

/**
 * Set a key value pair in the cache.
 * @param {string} key - Key
 * @param {object} value - Value to be added. Value will be stringified
 * @param {object} mode - Type of time ["EX" - s, "PX" - ms]
 * @param {object} time - Time based on specified mode
 */
const setCacheModeExp = async (key, value, mode, time) => {
  return await asyncRedisClient.set(`<module_name>:${key}`, JSON.stringify(value), mode, time);
};

/**
 * Get a key value pair from the cache.
 * @param {string} key - Key
 */
const getCache = async (key) => {
  const cached = await asyncRedisClient.get(`<module_name>:${key}`);
  return JSON.parse(cached);
};

module.exports = { setCache, setCacheExp, setCacheModeExp, getCache };

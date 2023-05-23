const winston = require('winston');
const LogzioWinstonTransport = require('winston-logzio');

const config = require('./config');

const getWinstonTransport = (type) =>
  new LogzioWinstonTransport({
    level: type,
    name: 'winston_logzio',
    host: config.logzio.host,
    token: config.logzio.token
  });

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [getWinstonTransport('error')]
});

module.exports = logger;

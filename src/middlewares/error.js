const mongoose = require('mongoose');
const httpStatus = require('http-status');

const config = require('../config/config');
const logger = require('../config/logger');
const LogzIoLogger = require('../config/winstonLogger');
const AppError = require('../utils/appError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof AppError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppError(statusCode, message, false, 'apiError', err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    httpResponse: {
      code: statusCode,
      class: httpStatus[`${statusCode}_CLASS`],
      name: httpStatus[`${statusCode}_NAME`],
      message: httpStatus[`${statusCode}_MESSAGE`]
    },
    success: false,
    code: statusCode,
    message,
    ...(config.env === 'development' && { type: err.type, stack: err.stack })
  };

  if (config.env === 'development' && logger) logger.error(err);

  if (config.env !== 'development' && LogzIoLogger)
    LogzIoLogger.error(`HTTP:${req.method} - ${err.statusCode} - ${req.originalUrl} - message: ${err.message}`, {
      'res.statusCode': err.statusCode,
      'req.method': req.method,
      rawError: err.rawError,
      user: req.user,
      error: { code: err.code, type: err.type, message: err.message }
    });

  res.status(statusCode).send(response);
};

module.exports = { errorConverter, errorHandler };

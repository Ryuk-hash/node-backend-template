const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../envs/.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required().description('Node environment'),

    PORT: Joi.number().default(3000).description('Application Port Number'),

    MONGODB_URI: Joi.string().required().description('MongoDB URI'),

    JWT_SECRET: Joi.string().required().description('JWT Secret Key'),
    JWT_EXPIRY: Joi.string().default('30d').description('Days after which JWT expires'),

    GOOGLE_CLIENT_ID: Joi.string().description('Google Client ID'),
    GOOGLE_CLIENT_SECRET: Joi.string().description('Google Client Secret Key'),

    REDIS_URI: Joi.string().description('Redis URI'),

    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),

    ADMIN_SECRET: Joi.string().description('Admin Secret Key'),

    LOGZIO_HOST: Joi.string().default('listener.logz.io').description('Logz.io Host'),
    LOGZIO_TOKEN: Joi.string().description('Logz.io Token'),

    FRONTEND_URL: Joi.string().description('Frontend App URL (if any)')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URI + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      minPoolSize: 3,
      maxPoolSize: 8,
      socketTimeoutMS: 15000,
      serverSelectionTimeoutMS: 15000
    }
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiry: envVars.JWT_EXPIRY
  },
  google: {
    clientId: envVars.GOOGLE_CLIENT_ID,
    secret: envVars.GOOGLE_CLIENT_SECRET
  },
  redis: {
    uri: envVars.REDIS_URI
  },
  admin: {
    secret: envVars.ADMIN_SECRET
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  },
  logzio: {
    host: envVars.LOGZIO_HOST,
    token: envVars.LOGZIO_TOKEN
  },
  others: {
    frontendUrl: envVars.FRONTEND_URL
  }
};

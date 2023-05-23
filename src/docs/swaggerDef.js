const { license, version, name } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: name,
    description: 'MathonGo | [GitHub](https://github.com/Ryuk-hash/node-backend-template)',
    version,
    license: { name: license }
  },
  servers: [
    { url: `http://localhost:${config.port}/v1`, description: 'Development server' }
    // { url: `http://staging-url/v1`, description: 'Staging server' },
  ]
};

module.exports = swaggerDef;

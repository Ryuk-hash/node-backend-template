const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const httpStatus = require('http-status');

const swaggerDefinition = require('../../docs/swaggerDef');
const Success = require('../../utils/success');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js']
});

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, { explorer: true }));
router.get('/formatted-response-api', (req, res) => {
  res.status(httpStatus.OK).send(Success({ code: httpStatus.OK, message: 'Tested successfully.', data: { ok: true } }));
});

module.exports = router;

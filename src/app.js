'use strict';

const express = require('express');
const swaggerUI = require('swagger-ui-express');
const logger = require('./logger');
const docs = require('./docs');
const { ridesRoute } = require('./routes');

const app = express();
const port = 8010;

module.exports = () => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
  app.get('/health', (req, res) => res.send('Healthy'));
  app.use('/rides', ridesRoute);

  app.listen(port, () => {
    logger.info(`App started and listening on port ${port}`);
  });

  return app;
};

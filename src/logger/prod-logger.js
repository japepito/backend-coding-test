const { createLogger, transports, format } = require('winston');

function buildProdLogger() {
  return createLogger({
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
      }),
    ],
  });
}

module.exports = buildProdLogger;

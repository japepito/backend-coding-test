const { createLogger, transports, format } = require('winston');

function buildDevLogger() {
  const loggerFormat = format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return createLogger({
    format: format.combine(
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.errors({ stack: true }),
      loggerFormat
    ),
    transports: [new transports.Console()],
  });
}

module.exports = buildDevLogger;

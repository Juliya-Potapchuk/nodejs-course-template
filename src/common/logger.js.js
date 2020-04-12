const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.timestamp()),
  transports: [
    new transports.File({
      filename: path.join(__dirname, '/log/error.log'),
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: path.join(__dirname, '/log/info.log'),
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

const middlewareInfo = (req, res, next) => {
  // For check 500 error
  // throw new Error('t');
  // eslint-disable-next-line no-unreachable

  const { url, method, body, query } = req;
  logger.info('info', { URL: url, METHOD: method, BODY: body, QUERY: query });
  next();
};

const middlewareError = (err, req, res, next) => {
  if (err) {
    const { url, method, body, query } = req;
    logger.error('error', {
      URL: url,
      METHOD: method,
      CODE: err.statusCode,
      BODY: body,
      QUERY: query
    });
  }
  next();
};

module.exports = { middlewareInfo, middlewareError, logger };

const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:MM:SS' })),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.cli())
    }),
    new transports.File({
      filename: path.join(__dirname, '/log/error.log'),
      level: 'error',
      format: format.combine(format.json(), format.colorize())
    }),
    new transports.File({
      filename: path.join(__dirname, '/log/info.log'),
      level: 'info',
      format: format.combine(format.json(), format.colorize())
    })
  ]
});

const middlewareInfo = (req, res, next) => {
  const { url, method, body, query } = req;
  logger.log(
    'info',
    `URL: ${url}, METHOD: ${method}, BODY: ${JSON.stringify(
      body
    )}, QUERY: ${JSON.stringify(query)}`
  );
  next();
};

const middlewareError = (err, req, res, next) => {
  if (err) {
    logger.log('error', `${err.message}, CODE: ${err.statusCode}`);
  }
  next();
};

module.exports = { middlewareInfo, middlewareError, logger };

const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./common/logger.js');

// setTimeout(() => {
//   throw new Error('Oops!');
// }, 1500);

// Promise.reject(Error('Oops!'));

process.on('uncaughtException', (err, origin) => {
  logger.log('error', { message: err.message, error: origin });
  console.log(` Error: ${origin}. Message: ${err.message}`);
});

process.on('unhandledRejection', reason => {
  logger.log('error', {
    message: reason.message,
    error: 'unhandledRejection'
  });
  console.log(` Error: UnhandledRejection. Message: ${reason.message}`);
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

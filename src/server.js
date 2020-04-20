const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDB } = require('./db/data.base');
const { logger } = require('./common/logger.js');
const exit = process.exit;

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

process
  .on('uncaughtException', err => {
    logger.log('error', `${err.message}`);
    logger.on('finish', () => exit(1));
  })
  .on('unhandledRejection', async reason => {
    logger.log('error', `${reason.message}`);
    logger.on('finish', () => exit(1));
  });

// for check 'uncaughtException'
// throw Error('Error uncaughtException');

// for check 'unhandledRejection'
// Promise.reject(Error('Error unhandledRejection'));

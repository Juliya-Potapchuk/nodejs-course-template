const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDB } = require('./db/data.base');
const exit = process.exit;

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

process
  .on('uncaughtException', (err, origin) => {
    console.log(` Error: ${origin}. Message: ${err.message}`);
    exit(1);
  })
  .on('unhandledRejection', async reason => {
    console.log(` Error: UnhandledRejection. Message: ${reason.message}`);
    exit(1);
  });
// for check 'uncaughtException'
// throw Error('Error uncaughtException');

// for check 'unhandledRejection'
// Promise.reject(Error('Error unhandledRejection'));

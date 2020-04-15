const { PORT } = require('./common/config');
const app = require('./app');
const exit = process.exit;

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

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

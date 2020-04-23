const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const { createUser } = require('../resources/users/user.service');

const connectToDB = connectLocalHost => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log('DB is connected!');
    await db.dropDatabase();
    await createUser({ name: 'Admin', login: 'admin', password: 'admin' });
    connectLocalHost();
  });
};

module.exports = { connectToDB };

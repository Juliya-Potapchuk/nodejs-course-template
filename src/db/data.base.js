const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
// const User = require('../resources/users/user.model');
// const Board = require('../resources/boards/board.model');
// const Task = require('../resources/tasks/task.model');

// const usersData = [
//   new User({ name: 'Pete', login: '111', password: 'nmm' }),
//   new User({ name: 'OLga', login: '222', password: 'nhmhbn' })
// ];

// const boardsData = [
//   new Board({
//     title: 'My board',
//     columns: [
//       {
//         title: 'string',
//         order: 0
//       }
//     ]
//   }),
//   new Board({
//     title: 'Your board',
//     columns: [
//       {
//         title: 'string',
//         order: 0
//       }
//     ]
//   })
// ];

// const tasksData = [
//   new Task({
//     title: 'My Task',
//     order: 0,
//     description: 'My description',
//     userId: '7c0c3b3a-b66f-4917-96b2-65c6fde2b7e3',
//     boardId: '7c0c3b3a-b66f-4917-9620-65c6fde2b7e3',
//     columnId: '7532b3a-b66f-4917-9620-65c6fde2b7e3'
//   })
// ];

const connectToDB = connectLocalHost => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log('we are connected!');
    await db.dropDatabase();

    // await usersData.forEach(user => user.save());
    // await boardsData.forEach(board => board.save());
    // await tasksData.forEach(task => task.save());
    connectLocalHost();
  });
};

module.exports = { connectToDB };

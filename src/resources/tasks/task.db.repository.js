const Task = require('./task.model');

const getTasksByBoardID = async boardId => await Task.find({ boardId }).exec();

const getTasksByBoardAndTaskID = async (boardId, taskId) => {
  return await Task.findOne({ _id: taskId, boardId }).exec();
};

const createTask = async newTaskData => Task.create(newTaskData);

const updateTask = async newTaskData => {
  return await Task.updateOne(
    { _id: newTaskData.taskId, boardId: newTaskData.boardId },
    newTaskData
  ).exec();
};

const deleteTask = async (boardId, taskId) => {
  return (await Task.deleteOne({ _id: taskId, boardId })).deletedCount;
};

const boardDeleteListener = async boardId => await Task.deleteMany({ boardId });

const userDeleteListener = async userId => {
  await Task.updateMany({ userId }, { $set: { userId: null } }).exec();
};

module.exports = {
  getTasksByBoardID,
  getTasksByBoardAndTaskID,
  createTask,
  updateTask,
  deleteTask,
  boardDeleteListener,
  userDeleteListener
};

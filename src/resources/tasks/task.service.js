const tasksRepo = require('./task.db.repository');

const getTasksByBoardID = boardId => tasksRepo.getTasksByBoardID(boardId);

const getTasksByBoardAndTaskID = (boardId, taskId) =>
  tasksRepo.getTasksByBoardAndTaskID(boardId, taskId);

const createTask = newTaskData => tasksRepo.createTask(newTaskData);

const updateTask = newTaskData => {
  return tasksRepo.updateTask(newTaskData);
};

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = {
  getTasksByBoardID,
  getTasksByBoardAndTaskID,
  createTask,
  updateTask,
  deleteTask
};

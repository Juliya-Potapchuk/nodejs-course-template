const tasksRepo = require('./task.memory.repository');

const getTasksByBoardID = boardId => tasksRepo.getTasksByBoardID(boardId);

const getTasksByBoardAndTaskID = (boardId, taskId) =>
  tasksRepo.getTasksByBoardAndTaskID(boardId, taskId);

const createTask = (boardId, newTaskData) =>
  tasksRepo.createTask(boardId, newTaskData);

const updateTask = (boardId, taskId, newTaskData) => {
  return tasksRepo.updateTask(boardId, taskId, newTaskData);
};

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = {
  getTasksByBoardID,
  getTasksByBoardAndTaskID,
  createTask,
  updateTask,
  deleteTask
};

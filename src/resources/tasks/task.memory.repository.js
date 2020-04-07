let tasksData = require('../../data/task.json');
const Task = require('./task.model');

const getTasksByBoardID = async boardId => {
  const arrTasks = [];

  tasksData.map(task => {
    if (task.boardId === boardId) {
      arrTasks.push(task);
    }
  });

  return arrTasks;
};

const getTasksByBoardAndTaskID = async (boardId, taskId) => {
  const arrTasks = [];

  tasksData.map(task => {
    if (task.boardId === boardId && task.id === taskId) {
      arrTasks.push(task);
    }
  });
  return arrTasks;
};

const createTask = async (boardId, newTaskData) => {
  const newTask = new Task(newTaskData);
  newTask.boardId = boardId;
  tasksData.push(newTask);
  return newTask;
};

const updateTask = async (boardId, taskId, newTaskData) => {
  const { title, order, description, columnId, userId } = newTaskData;

  const index = tasksData.findIndex(task => {
    return task.boardId === boardId;
  });

  if (index === -1) {
    return false;
  }

  tasksData[index] = {
    boardId,
    columnId,
    description,
    id: taskId,
    order,
    title,
    userId
  };

  return tasksData[index];
};

const deleteTask = async (boardId, taskId) => {
  const index = await tasksData.findIndex(taskdObj => {
    return taskdObj.boardId === boardId && taskdObj.id === taskId;
  });
  if (index === -1) {
    return false;
  }
  await tasksData.splice(index, 1);
  return true;
};

const boardDeleteListener = async boardId => {
  tasksData = tasksData.filter(taskObj => {
    return taskObj.boardId !== boardId;
  });
};

const userDeleteListener = async userId => {
  tasksData.map(taskObj => {
    if (taskObj.userId === userId) {
      taskObj.userId = null;
    }
  });
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

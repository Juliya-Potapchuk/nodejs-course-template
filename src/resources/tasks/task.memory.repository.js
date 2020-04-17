// let tasksData = require('../../data/task.json');
// const Task = require('./task.model');

// const getTasksByBoardID = async boardId => {
//   return tasksData.filter(task => task.boardId === boardId);
// };

// const getTasksByBoardAndTaskID = async (boardId, taskId) => {
//   return tasksData.find(task => task.boardId === boardId && task.id === taskId);
// };

// const createTask = async (boardId, newTaskData) => {
//   const newTask = new Task({ ...newTaskData, boardId });
//   tasksData.push(newTask);
//   return newTask;
// };

// const updateTask = async (boardId, taskId, newTaskData) => {
//   const index = tasksData.findIndex(task => {
//     return task.boardId === boardId && task.id === taskId;
//   });
//   if (index === -1) return false;
//   tasksData[index] = { ...newTaskData, id: taskId };
//   return tasksData[index];
// };

// const deleteTask = async (boardId, taskId) => {
//   const index = await tasksData.findIndex(taskdObj => {
//     return taskdObj.boardId === boardId && taskdObj.id === taskId;
//   });
//   if (index === -1) return false;
//   await tasksData.splice(index, 1);
//   return true;
// };

// const boardDeleteListener = async boardId => {
//   tasksData = tasksData.filter(taskObj => {
//     return taskObj.boardId !== boardId;
//   });
// };

// const userDeleteListener = async userId => {
//   await tasksData.map(taskObj => {
//     if (taskObj.userId === userId) return (taskObj.userId = null);
//   });
// };

// module.exports = {
//   getTasksByBoardID,
//   getTasksByBoardAndTaskID,
//   createTask,
//   updateTask,
//   deleteTask,
//   boardDeleteListener,
//   userDeleteListener
// };

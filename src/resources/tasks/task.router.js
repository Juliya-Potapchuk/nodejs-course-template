const router = require('express').Router({ mergeParams: true });
// const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const boardId = req.params.boardId;

  const tasksArr = await tasksService.getTasksByBoardID(boardId);

  if (tasksArr.length === 0) {
    return res.status(401).send('Access token is missing or invalid');
  }

  return res.status(200).json(tasksArr.map(task => task));
});

router.route('/:id').get(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = await req.params.id;
  const tasksArr = await tasksService.getTasksByBoardAndTaskID(boardId, taskId);

  if (tasksArr.length === 0) {
    return res.status(401).send('Access token is missing or invalid');
  }

  res.status(200).json(tasksArr[0]);
});

router.route('/').post(async (req, res) => {
  const boardId = req.params.boardId;
  const newTaskData = await req.body;
  const newTask = await tasksService.createTask(boardId, newTaskData);

  res.status(200).json(newTask);
});

router.route('/:id').put(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = await req.params.id;
  const newTaskData = await req.body;
  const task = await tasksService.updateTask(boardId, taskId, newTaskData);

  if (!task) {
    return res.status(400).send('Bad request');
  }
  // console.log('task', typeof task);
  res.status(200).json(task);
});

router.route('/:id').delete(async (req, res) => {
  const boardId = req.params.boardId;
  const taskId = await req.params.id;

  const isSucsessDelete = await tasksService.deleteTask(boardId, taskId);

  if (!isSucsessDelete) {
    return res.status(404).send('Task not found');
  }
  return res.status(204).send('The task has been deleted');
});

module.exports = router;

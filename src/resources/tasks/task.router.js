const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const createError = require('http-errors');

router.route('/').get(async (req, res, next) => {
  const boardId = req.params.boardId;

  const tasksArr = await tasksService.getTasksByBoardID(boardId);

  if (tasksArr.length === 0) {
    const err = createError(401);
    return next(err);
  }
  res.status(200).json(tasksArr.map(task => task));
});

router.route('/:id').get(async (req, res, next) => {
  const boardId = req.params.boardId;
  const taskId = await req.params.id;
  const tasksArr = await tasksService.getTasksByBoardAndTaskID(boardId, taskId);

  if (tasksArr.length === 0) {
    const err = createError(401);
    return next(err);
  }

  res.status(200).json(tasksArr[0]);
});

router.route('/').post(async (req, res) => {
  const boardId = req.params.boardId;
  const newTaskData = await req.body;
  const newTask = await tasksService.createTask(boardId, newTaskData);

  res.status(200).json(newTask);
});

router.route('/:id').put(async (req, res, next) => {
  const boardId = req.params.boardId;
  const taskId = await req.params.id;
  const newTaskData = await req.body;
  const task = await tasksService.updateTask(boardId, taskId, newTaskData);

  if (!task) {
    const err = createError(400);
    return next(err);
  }
  res.status(200).json(task);
});

router.route('/:id').delete(async (req, res, next) => {
  const boardId = req.params.boardId;
  const taskId = await req.params.id;

  const delTask = await tasksService.deleteTask(boardId, taskId);

  if (!delTask) {
    const err = createError(404);
    return next(err);
  }
  res.status(204).send(delTask);
});

module.exports = router;

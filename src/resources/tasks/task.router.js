const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const createError = require('http-errors');
const { catchError } = require('../../common/catchError');

router.route('/').get(
  catchError(async (req, res) => {
    const boardId = req.params.boardId;
    const tasksArr = await tasksService.getTasksByBoardID(boardId);
    return res.status(200).json(tasksArr);
  })
);

router.route('/:id').get(
  catchError(async (req, res, next) => {
    const boardId = req.params.boardId;
    const taskId = req.params.id;
    const task = await tasksService.getTasksByBoardAndTaskID(boardId, taskId);
    if (!task) return next(createError(404, 'Not Found'));
    return res.status(200).json(task);
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const boardId = req.params.boardId;
    const newTaskData = req.body;
    const newTask = await tasksService.createTask(boardId, newTaskData);
    return res.status(200).json(newTask);
  })
);

router.route('/:id').put(
  catchError(async (req, res, next) => {
    const boardId = req.params.boardId;
    const taskId = req.params.id;
    const newTaskData = req.body;
    const task = await tasksService.updateTask(boardId, taskId, newTaskData);
    if (!task) return next(createError(404, 'Not Found'));
    return res.status(200).json(task);
  })
);

router.route('/:id').delete(
  catchError(async (req, res, next) => {
    const boardId = req.params.boardId;
    const taskId = req.params.id;
    const delTask = await tasksService.deleteTask(boardId, taskId);
    if (!delTask) return next(createError(404, 'Not Found'));
    return res.status(204).send('The task has been deleted');
  })
);

module.exports = router;

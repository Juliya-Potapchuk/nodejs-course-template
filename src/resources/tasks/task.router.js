const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const createError = require('http-errors');
const { catchError } = require('../../common/errors/catchError');
const Task = require('./task.model');

router.route('/').get(
  catchError(async (req, res) => {
    const boardId = req.params.boardId;
    const tasks = await tasksService.getTasksByBoardID(boardId);
    return res.status(200).json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req, res, next) => {
    const boardId = req.params.boardId;
    const taskId = req.params.id;
    const task = await tasksService.getTasksByBoardAndTaskID(boardId, taskId);
    if (!task) return next(createError(404, 'Not Found'));
    return res.status(200).json(Task.toResponse(task));
  })
);

router.route('/').post(
  catchError(async (req, res) => {
    const boardId = req.params.boardId;
    const newTaskData = req.body;
    const newTask = await tasksService.createTask({ ...newTaskData, boardId });
    return res.status(200).json(Task.toResponse(newTask));
  })
);

router.route('/:id').put(
  catchError(async (req, res, next) => {
    const boardId = req.params.boardId;
    const taskId = req.params.id;
    const newTaskData = req.body;
    const task = await tasksService.updateTask({
      ...newTaskData,
      boardId,
      taskId
    });
    if (!task) return next(createError(404, 'Not Found'));
    return res.status(200).json(Task.toResponse(task));
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

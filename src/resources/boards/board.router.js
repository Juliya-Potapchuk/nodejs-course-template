const router = require('express').Router();
const boardsService = require('./board.service');
const validator = require('./validator');
const Board = require('./board.model');
const createError = require('http-errors');

router.route('/').get(async (req, res, next) => {
  const boards = await boardsService.getAll();
  if (boards.length === 0) {
    const err = createError(401);
    return next(err);
  }
  res.status(200).json(boards);
});

router.route('/:id').get(async (req, res, next) => {
  const id = await req.params.id;
  const board = await boardsService.getBoard(id);

  if (!board) {
    const err = createError(404);
    return next(err);
  }
  res.status(200).json(board);
});

router.route('/').post(async (req, res, next) => {
  const newBorderData = await req.body;
  const isValid = validator.BoardCreate(newBorderData);

  if (!isValid) {
    const err = createError(400);
    return next(err);
  }
  const newBoard = await boardsService.createBoard(newBorderData);
  res.status(200).json(Board.toResponse(newBoard));
});

router.route('/:id').put(async (req, res, next) => {
  const id = await req.params.id;
  const newPropOfBoard = await req.body;
  const board = await boardsService.updateBoard(id, newPropOfBoard);
  if (!board) {
    const err = createError(400);
    return next(err);
  }
  res.status(200).json(board);
});

router.route('/:id').delete(async (req, res, next) => {
  const boardId = await req.params.id;
  const boardsData = await boardsService.deleteBoard(boardId);

  if (!boardsData) {
    const err = createError(404);
    return next(err);
  }
  res.status(200).json(boardId);
});

module.exports = router;

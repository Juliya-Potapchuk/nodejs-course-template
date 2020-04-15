const router = require('express').Router();
const boardsService = require('./board.service');
const validator = require('./validator');
const Board = require('./board.model');
const createError = require('http-errors');
const { catchError } = require('../../common/catchError');

router.route('/').get(
  catchError(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  })
);

router.route('/:id').get(
  catchError(async (req, res, next) => {
    const id = req.params.id;
    const board = await boardsService.getBoard(id);
    if (!board) return next(createError(404, 'Not Found'));
    return res.status(200).json(board);
  })
);

router.route('/').post(
  catchError(async (req, res, next) => {
    const newBorderData = req.body;
    const isValid = validator.BoardCreate(newBorderData);
    if (!isValid) return next(createError(404, 'Not Found'));
    const newBoard = await boardsService.createBoard(newBorderData);
    return res.status(200).json(Board.toResponse(newBoard));
  })
);

router.route('/:id').put(
  catchError(async (req, res, next) => {
    const id = req.params.id;
    const newPropOfBoard = req.body;
    const board = await boardsService.updateBoard(id, newPropOfBoard);
    if (!board) return next(createError(404, 'Not Found'));
    return res.status(200).json(board);
  })
);

router.route('/:id').delete(
  catchError(async (req, res, next) => {
    const boardId = req.params.id;
    const boardsData = await boardsService.deleteBoard(boardId);
    if (!boardsData) return next(createError(404, 'Not Found'));
    return res.status(204).json('The board has been deleted');
  })
);

module.exports = router;

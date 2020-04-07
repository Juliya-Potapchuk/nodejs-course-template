const router = require('express').Router();
const boardsService = require('./board.service');
const validator = require('./validator');
const Board = require('./board.model');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  if (boards.length === 0) {
    return res.status(401).send('Access token is missing or invalid');
  }
  res.status(200).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const id = await req.params.id;
  const board = await boardsService.getBoard(id);

  if (!board) {
    return res.status(404).send('Board not found');
  }
  res.status(200).json(board);
});

router.route('/').post(async (req, res) => {
  const newBorderData = await req.body;
  const isValid = validator.BoardCreate(newBorderData);

  if (!isValid) {
    return res.status(400).send('Bad request');
  }
  const newBoard = await boardsService.createBoard(newBorderData);

  res.status(200).json(Board.toResponse(newBoard));
});

router.route('/:id').put(async (req, res) => {
  const id = await req.params.id;
  const newPropOfBoard = await req.body;
  const board = await boardsService.updateBoard(id, newPropOfBoard);
  if (!board) {
    return res.status(400).send('Bad request');
  }
  res.status(200).json(board);
});

router.route('/:id').delete(async (req, res) => {
  const boardId = await req.params.id;

  const boardsData = await boardsService.deleteBoard(boardId);

  if (!boardsData) {
    return res.status(404).send('Board not found');
  }
  return res.status(200).json(boardId);
});

module.exports = router;

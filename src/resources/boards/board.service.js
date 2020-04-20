const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.getAll();
const getBoard = id => boardsRepo.getBoard(id);
const createBoard = newBoardData => boardsRepo.createBoard(newBoardData);
const updateBoard = newPropOfBoard => {
  return boardsRepo.updateBoard(newPropOfBoard);
};
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };

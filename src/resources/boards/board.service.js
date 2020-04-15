const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getBoard = id => boardsRepo.getBoard(id);
const createBoard = newBoardData => boardsRepo.createBoard(newBoardData);
const updateBoard = (id, newPropOfBoard) => {
  return boardsRepo.updateBoard(id, newPropOfBoard);
};
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };

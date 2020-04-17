// const boardsData = require('../../data/board.json');
// const Board = require('./board.model');
// const listener = require('../tasks/task.memory.repository');

// const getAll = async () => boardsData;

// const getBoard = async id => {
//   return boardsData.find(boardObj => boardObj.id === id);
// };

// const createBoard = async newBoardData => {
//   const newBoard = new Board(newBoardData);
//   boardsData.push(newBoard);
//   return newBoard;
// };

// const updateBoard = async (id, newPropOfBoard) => {
//   const index = boardsData.findIndex(BoardObj => BoardObj.id === id);
//   if (index === -1) return false;
//   boardsData[index] = { ...newPropOfBoard, id };
//   return boardsData[index];
// };

// const deleteBoard = async boardId => {
//   const index = await boardsData.findIndex(boardObj => boardObj.id === boardId);
//   if (index === -1) return false;
//   await listener.boardDeleteListener(boardId); // delete tasks connected with this board
//   await boardsData.splice(index, 1);
//   return true;
// };

// module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };

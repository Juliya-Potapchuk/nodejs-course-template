const Board = require('./board.model');
const listener = require('../tasks/task.db.repository');

const getAll = async () => await Board.find({}).exec();

const getBoard = async id => await Board.findOne({ _id: id }).exec();

const createBoard = async newBoardData => Board.create(newBoardData);

const updateBoard = async newPropOfBoard => {
  const boardForDB = Board.toDB(newPropOfBoard);
  const board = await Board.findOneAndUpdate(
    { _id: newPropOfBoard.id },
    boardForDB,
    { new: true }
  ).exec();

  return board;
};

const deleteBoard = async boardId => {
  const isSuccessDelete = (await Board.deleteOne({ _id: boardId }))
    .deletedCount;
  if (isSuccessDelete) {
    await listener.boardDeleteListener(boardId); // delete tasks connected with this board
  }
  return isSuccessDelete;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };

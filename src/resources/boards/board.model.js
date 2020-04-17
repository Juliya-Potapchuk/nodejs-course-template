const mongoose = require('mongoose');
const uuid = require('uuid');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [
      {
        _id: {
          type: String,
          default: uuid
        },
        order: Number,
        title: String
      }
    ]
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { _id, title, columns } = board;
  const filterColumns = columns.map(column => ({
    id: column._id,
    title: column.title,
    order: column.order
  }));
  return { id: _id, title, columns: filterColumns };
};

boardSchema.statics.toDB = board => {
  const { id, title, columns } = board;
  const filterColumns = columns.map(column => ({
    _id: column.id,
    title: column.title,
    order: column.order
  }));
  return { _id: id, title, columns: filterColumns };
};

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;

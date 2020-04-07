const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'COLUMN', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [new Column()] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    delete columns[0].id;
    return { id, title, columns };
  }
}

module.exports = Board;

const TaskCreate = newTaskData => {
  const { title, order, description, userId, boardId, columnId } = newTaskData;

  if (
    typeof title === 'string' &&
    typeof description === 'string' &&
    typeof userId === 'string' &&
    typeof boardId === 'string' &&
    typeof columnId === 'string' &&
    typeof order === 'number'
  ) {
    return true;
  }
  return false;
};

module.exports = { TaskCreate };

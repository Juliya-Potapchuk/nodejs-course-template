const BoardCreate = newBorderData => {
  console.log('newBorderData', newBorderData);
  const { title, columns } = newBorderData;
  const titleColumns = columns[0].title;
  const { order } = columns[0];
  if (
    typeof title === 'string' &&
    typeof titleColumns === 'string' &&
    Number.isInteger(order)
  ) {
    return true;
  }
  return false;
};

module.exports = { BoardCreate };

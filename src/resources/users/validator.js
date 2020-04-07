const UserCreate = newUserData => {
  const { name, login, password } = newUserData;
  if (
    typeof name === 'string' &&
    typeof login === 'string' &&
    typeof password === 'string'
  ) {
    return true;
  }
  return false;
};

module.exports = { UserCreate };

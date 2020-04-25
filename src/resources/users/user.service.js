const usersRepo = require('./user.db.repository');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);

const createUser = async newUserData => {
  const hashedPassword = await bcrypt.hash(newUserData.password, saltRounds); // password change to hash
  return usersRepo.createUser({ ...newUserData, password: hashedPassword });
};

const updateUser = newPropOfUser => usersRepo.updateUser(newPropOfUser);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

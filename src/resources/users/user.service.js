const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = id => usersRepo.getUser(id);

const createUser = newUserData => usersRepo.createUser(newUserData);

const updateUser = (id, newPropOfUser) => {
  return usersRepo.updateUser(id, newPropOfUser);
};

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

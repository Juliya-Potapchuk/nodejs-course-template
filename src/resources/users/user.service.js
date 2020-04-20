const usersRepo = require('./user.db.repository');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const createUser = newUserData => usersRepo.createUser(newUserData);
const updateUser = newPropOfUser => usersRepo.updateUser(newPropOfUser);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

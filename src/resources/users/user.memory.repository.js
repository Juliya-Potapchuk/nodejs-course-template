const usersData = require('../../data/user.json');
const User = require('./user.model');
const listener = require('../tasks/task.memory.repository');

const getAll = async () => usersData;

const getUser = async id => {
  return usersData.find(userObj => userObj.id === id);
};

const createUser = async newUserData => {
  const newUser = new User(newUserData);
  usersData.push(newUser);
  return newUser;
};

const updateUser = async (id, newPropOfUser) => {
  const index = usersData.findIndex(userObj => userObj.id === id);
  if (index === -1) return false;
  usersData[index] = { ...newPropOfUser, id };
  return usersData[index];
};

const deleteUser = async id => {
  const index = await usersData.findIndex(userObj => userObj.id === id);
  if (index === -1) return false;
  await listener.userDeleteListener(id); // update tasks connected with this user
  await usersData.splice(index, 1);
  return true;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

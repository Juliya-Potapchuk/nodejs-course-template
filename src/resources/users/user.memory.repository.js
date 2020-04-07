const usersData = require('../../data/user.json');
const User = require('./user.model');
const listener = require('../tasks/task.memory.repository');

const getAll = async () => usersData;

const getUser = async id => {
  const user = usersData.find(userObj => userObj.id === id);
  return user;
};

const createUser = async newUserData => {
  const newUser = new User(newUserData);
  usersData.push(newUser);
  return newUser;
};

const updateUser = async (id, newPropOfUser) => {
  const index = usersData.findIndex(userObj => userObj.id === id);
  if (index === -1) {
    return false;
  }
  usersData[index] = {
    id,
    name: newPropOfUser.name,
    login: newPropOfUser.login,
    password: newPropOfUser.password
  };
  return usersData[index];
};

const deleteUser = async id => {
  const index = await usersData.findIndex(userObj => userObj.id === id);
  if (index === -1) {
    return false;
  }

  listener.userDeleteListener(id); // update tasks connected with this user

  await usersData.splice(index, 1);
  return true;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

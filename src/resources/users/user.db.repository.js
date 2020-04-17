const User = require('./user.model');
const listener = require('../tasks/task.db.repository');

const getAll = async () => await User.find({}).exec();

const getUser = async id => await User.findOne({ _id: id }).exec();

const createUser = async newUserData => User.create(newUserData);

const updateUser = async newPropOfUser =>
  await User.updateOne({ _id: newPropOfUser.id }, newPropOfUser);

const deleteUser = async id => {
  await listener.userDeleteListener(id); // update tasks connected with this user
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };

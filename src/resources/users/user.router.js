const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validator = require('./validator');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  if (users.length === 0) {
    return res.status(401).send('Access token is missing or invalid');
  }
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = await req.params.id;
  const user = await usersService.getUser(id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.status(200).json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const newUserData = await req.body;
  const isValid = validator.UserCreate(newUserData);
  if (!isValid) {
    return res.status(400).send('Bad request');
  }
  const newUser = await usersService.createUser(newUserData);
  res.status(200).json(User.toResponse(newUser));
});

router.route('/:id').put(async (req, res) => {
  const id = await req.params.id;
  const newPropOfUser = await req.body;
  const user = await usersService.updateUser(id, newPropOfUser);
  if (!user) {
    return res.status(400).send('Bad request');
  }
  res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const id = await req.params.id;
  const isSucsessDelete = await usersService.deleteUser(id);
  if (!isSucsessDelete) {
    return res.status(404).send('User not found');
  }
  return res.status(204).send('The user has been deleted');
});

module.exports = router;

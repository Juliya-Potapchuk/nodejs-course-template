const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validator = require('./validator');
const createError = require('http-errors');

router.route('/').get(async (req, res, next) => {
  const users = await usersService.getAll();
  if (users.length === 0) {
    const err = createError(401);
    return next(err);
  }
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  const id = await req.params.id;
  const user = await usersService.getUser(id);

  if (!user) {
    const err = createError(404);
    return next(err);
  }
  res.status(200).json(User.toResponse(user));
});

router.route('/').post(async (req, res, next) => {
  const newUserData = await req.body;
  const isValid = validator.UserCreate(newUserData);
  if (!isValid) {
    const err = createError(400);
    return next(err);
  }
  const newUser = await usersService.createUser(newUserData);
  res.status(200).json(User.toResponse(newUser));
});

router.route('/:id').put(async (req, res, next) => {
  const id = await req.params.id;
  const newPropOfUser = await req.body;
  const user = await usersService.updateUser(id, newPropOfUser);
  if (!user) {
    const err = createError(400);
    return next(err);
  }
  res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res, next) => {
  const id = await req.params.id;
  const isSucsessDelete = await usersService.deleteUser(id);
  if (!isSucsessDelete) {
    const err = createError(404);
    return next(err);
  }
  res.status(204).send('The user has been deleted');
});

module.exports = router;

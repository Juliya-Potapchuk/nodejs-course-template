const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validator = require('./validator');
const createError = require('http-errors');
const { catchError } = require('../../common/catchError');

router.route('/').get(
  catchError(async (req, res) => {
    // for check 500 error
    // throw new Error();
    const users = await usersService.getAll();
    return res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchError(async (req, res, next) => {
    const id = await req.params.id;
    const user = await usersService.getUser(id);
    if (!user) return next(createError(404, 'Not Found'));
    return res.status(200).json(User.toResponse(user));
  })
);

router.route('/').post(
  catchError(async (req, res, next) => {
    const newUserData = await req.body;
    const isValid = validator.UserCreate(newUserData);
    if (!isValid) return next(createError(404, 'Not Found'));
    const newUser = await usersService.createUser(newUserData);
    return res.status(200).json(User.toResponse(newUser));
  })
);

router.route('/:id').put(
  catchError(async (req, res, next) => {
    const id = await req.params.id;
    const newPropOfUser = await req.body;
    const user = await usersService.updateUser(id, newPropOfUser);
    if (!user) return next(createError(404, 'Not Found'));
    return res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchError(async (req, res, next) => {
    const id = await req.params.id;
    const isSucsessDelete = await usersService.deleteUser(id);
    if (!isSucsessDelete) return next(createError(404, 'Not Found'));
    return res.status(204).send('The user has been deleted');
  })
);

module.exports = router;

const router = require('express').Router();
const { createToken } = require('./login.server');
const { catchError } = require('../common/errors/catchError');
const createError = require('http-errors');

router.route('/').post(
  catchError(async (req, res, next) => {
    const data = req.body;
    const token = await createToken(data);
    if (!token) {
      return next(createError(403, 'Incorrect login or password'));
    }
    res.status(200).json({ auth: true, token });
    return next();
  })
);

module.exports = router;

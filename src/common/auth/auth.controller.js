const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');
const createError = require('http-errors');

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token, JWT_SECRET_KEY);
    return next();
  } catch (err) {
    return next(createError(401, 'Unauthorized'));
  }
};

module.exports = { checkToken };

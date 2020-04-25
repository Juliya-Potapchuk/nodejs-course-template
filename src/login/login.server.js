const User = require('../resources/users/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const createToken = async data => {
  const { login, password } = data;
  const user = await User.findOne({ login }).exec();
  const existPassword = await bcrypt.compare(password, user.password);
  if (!existPassword || !user) return false;

  const token = await jwt.sign({ userId: user._id, login }, JWT_SECRET_KEY, {
    expiresIn: 60 * 60
  });
  return token;
};

module.exports = { createToken };

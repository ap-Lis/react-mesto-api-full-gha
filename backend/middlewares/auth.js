const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? 'a-man-a-plan-a-canal-panama' : JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Ошибка проверки jwt токена'));
  }
  req.user = payload;
  return next();
};

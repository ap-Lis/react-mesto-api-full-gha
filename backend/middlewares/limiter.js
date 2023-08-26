const rateLimit = require('express-rate-limit');

const limiterHandler = (req, res, next) => {
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    headers: true,
    message: 'Слишком много запросов с этого IP, попоробуйте повторить попытку через 15 минут.',
  });
  return next();
};

module.exports = limiterHandler;

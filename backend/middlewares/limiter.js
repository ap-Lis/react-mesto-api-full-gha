const rateLimit = require('express-rate-limit');

const limiterHandler = (next) => {
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: 'Слишком много запросов с этого IP, попоробуйте повторить попытку через 15 минут.',
  });
  next();
};

module.exports = limiterHandler;

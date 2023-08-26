const rateLimit = require('express-rate-limit');

const limiterHandler = () => {
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    headers: true,
    message: 'Слишком много запросов с этого IP, попоробуйте повторить попытку через 15 минут.',
    handler(req, res, next) {
      res.removeHeader('X-Powered-By');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      res.status(this.statusCode || 429).send(this.message);
      return next();
    },
  });
};

module.exports = limiterHandler;

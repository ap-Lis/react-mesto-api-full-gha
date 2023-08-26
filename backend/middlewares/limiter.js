const rateLimit = require('express-rate-limit');

const limiterHandler = () => {
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    headers: true,
    message: 'Слишком много запросов с этого IP, попоробуйте повторить попытку через 15 минут.',
    handler(req, res, next) {
      const allowedCors = [
        'https://ap-mesto.nomoredomainsicu.ru',
        'http://ap-mesto.nomoredomainsicu.ru',
        'localhost:3000',
        'http://localhost:3000',
      ];
      const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
      const { origin } = req.headers;
      const { method } = req;
      const requestHeaders = req.headers['access-control-request-headers'];

      if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
      }

      if (method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
        res.header('Access-Control-Allow-Headers', requestHeaders);
        return res.end();
      }

      return next();
    },
  });
};

module.exports = limiterHandler;

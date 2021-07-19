const jwt = require('jsonwebtoken');
const AuthentificationError = require('../errors/authentification-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthentificationError('Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(authorization, 'jwt_secret_key');
  } catch (err) {
    next(new AuthentificationError('Необходима авторизация'));
  }
  req.user = payload;

  next();
};

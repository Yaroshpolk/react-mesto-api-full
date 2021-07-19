const jwt = require('jsonwebtoken');
const AuthentificationError = require('../errors/authentification-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthentificationError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer', '');
  let payload;

  try {
    payload = jwt.verify(token, 'jwt_secret_key');
  } catch (err) {
    next(new AuthentificationError('Необходима авторизация'));
  }
  req.user = payload;

  next();
};

const allowedCors = [
  'https://yar.mesto.nomoredomains.rocks',
  'http://yar.mesto.nomoredomains.rocks',
];
const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200).send();
    return;
  }
  next();
});

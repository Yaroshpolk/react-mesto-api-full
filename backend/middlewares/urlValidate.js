const validator = require('validator');

const urlValidate = (value) => {
  const result = validator.isURL(value, { require_protocol: true });
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

module.exports = {
  urlValidate,
};

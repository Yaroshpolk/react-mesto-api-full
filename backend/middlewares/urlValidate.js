const validator = require('validator');

module.exports.urlValidate = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

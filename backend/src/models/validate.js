const { validationResult } = require('express-validator');

module.exports = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: 'Validation error', errors: errors.array() });
  }
  next();
};

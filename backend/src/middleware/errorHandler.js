module.exports = function (err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Server error';
  res.status(status).json({ msg: message, details: err.details || null });
};

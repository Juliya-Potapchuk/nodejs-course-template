const HttpStatus = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err) {
    err.statusCode = err.statusCode || 500;

    if (err.statusCode !== 500) {
      res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
      });
      return next(err);
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
    });
    return next(err);
  }
  next();
};

module.exports = errorHandler;

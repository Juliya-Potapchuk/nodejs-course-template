const HttpStatus = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.statusCode === 404) {
      res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
      });
      return next(err);
    }
    if (err.statusCode === 401) {
      res.status(HttpStatus.UNAUTHORIZED).send({
        error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)
      });
      return next(err);
    }
    if (err.statusCode === 400) {
      res.status(HttpStatus.BAD_REQUEST).send({
        error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
      });
      return next(err);
    }
    err.statusCode = 500;
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
    });
    return next(err);
  }
  next();
};

module.exports = errorHandler;

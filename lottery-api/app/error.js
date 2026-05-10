const e = require("express");

const notFoundError = (_req, _res, next) => {
  const error = new Error("Resource Not Found");
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = {
  notFoundError,
  errorHandler,
};

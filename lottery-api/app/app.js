require("dotenv").config();
const express = require("express");
const app = express();
const middleware = require("./middleware");
app.use(middleware);
const routes = require("./routes");
const { errorHandler, notFoundError } = require("./error");
app.use(routes);
app.use(notFoundError);
app.use(errorHandler);

module.exports = app;

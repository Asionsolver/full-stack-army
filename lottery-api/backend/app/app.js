require("dotenv").config();
const express = require("express");
const app = express();
const middleware = require("./middleware");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("../config/swagger");

app.use(express.json());

app.use(cors());
app.use(middleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const routes = require("./routes");
const { errorHandler, notFoundError } = require("./error");
app.use(routes);
app.use(notFoundError);
app.use(errorHandler);

module.exports = app;

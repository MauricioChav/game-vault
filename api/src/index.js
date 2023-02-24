const express = require("express");
const cors = require("cors");
//Loads mongoose to connect to db
require("./db/mongoose");

const userRouter = require("./routers/user");
const gameRouter = require("./routers/game");
const reviewRouter = require("./routers/review");

//Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDocs = require("swagger-jsdoc");
const SwaggerConfig = require("./SwaggerConfig");

//Express Port
const app = express();
const port = process.env.PORT || 9000;

app.use(cors());

//Automatically parse JSON to object
app.use(express.json());

//App Routers
app.use(userRouter);
app.use(gameRouter);
app.use(reviewRouter);

//Swagger
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDocs(SwaggerConfig))
);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

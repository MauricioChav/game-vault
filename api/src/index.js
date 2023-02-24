const express = require("express");
const cors = require("cors");
const path = require("path");
//Loads mongoose to connect to db
require("./db/mongoose");

const userRouter = require("./routers/user");
const gameRouter = require("./routers/game");
const reviewRouter = require("./routers/review");

//Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDocs = require("swagger-jsdoc");

const swaggerSpecs = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Game Vault API",
      description:
        "An API designed to manage users, games and reviews for the Game Vault website",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:9000" }],
  },
  apis: [`${path.join(__dirname, "./routers/*.js")}`],
};

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
  swaggerUI.setup(swaggerJsDocs(swaggerSpecs))
);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const path = require("path");

const SwaggerConfig = {
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

  module.exports = SwaggerConfig;
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const connectionURL = "mongodb://127.0.0.1:27017/game-vault-api";
mongoose.connect(connectionURL, { useNewUrlParser: true });
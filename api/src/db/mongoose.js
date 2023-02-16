const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

//Standalone DB (Local)
// const connectionURL = "mongodb://127.0.0.1:27017/game-vault-api";

//Replica connection (Local)
const connectionURL = "mongodb://DESKTRIFORCE:27017/game-vault-api?replicaSet=rs";

mongoose.connect(connectionURL, { useNewUrlParser: true });
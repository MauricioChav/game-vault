const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

//Standalone DB (Local or Replica Set using Docker containers)
//const connectionURL = "mongodb://127.0.0.1:27017/game-vault-api";

//Replica connection (Local, using run-rs)
//const connectionURL = "mongodb://DESKTRIFORCE:27017/game-vault-api?replicaSet=rs";

//Replica Set using Docker containers
const connectionURL = "mongodb://127.0.0.1:27017/game-vault-api?directConnection=true";

//Desktop 172.20.64.1

mongoose.connect(connectionURL, { useNewUrlParser: true });
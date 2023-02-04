const express = require("express");
const cors = require('cors');
//Loads mongoose to connect to db
require("./db/mongoose");
const userRouter = require('./routers/user');
const gameRouter = require('./routers/game');
const reviewRouter = require('./routers/review');

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

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//TESTING

app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

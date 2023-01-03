const express = require("express");
//Loads mongoose to connect to db
require("./db/mongoose");
const userRouter = require('./routers/user');

//Express Port
const app = express();
const port = process.env.PORT || 9000;

//Automatically parse JSON to object
app.use(express.json());
//App Routers
app.use(userRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//TESTING

app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

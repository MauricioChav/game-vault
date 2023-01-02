const express = require("express");
//Loads mongoose to connect to db
require("./db/mongoose");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 9000;


//Automatically parse JSON to object
app.use(express.json());



app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.statusCode(400).send(e);
    });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//TESTING

app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

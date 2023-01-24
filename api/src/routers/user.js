const express = require("express");
const User = require("../models/user");
const auth = require("../Middleware/auth");
const router = new express.Router();

//CREATE A USER/ SIGN UP
router.post("/users/", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//LOG IN
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

//LOG OUT
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//VALIDATE USER
router.get("/users/validate", auth, async (req, res) => {
  res.send({ message: "User validated correctly" });
});

//ELIMINATE TOKEN IF IT IS ON DB
router.post("/users/deletedbtoken", async (req, res) => {
  const user = await User.findById(req.body._id);
  const token = req.body.token;

  //Function to verify if the token is on the DB
  const checkToken = (tokenCheck) => {
    return tokenCheck.token !== token;
  };

  try {
    //If it returns false, the token still exists
    if (!user.tokens.every(checkToken)) {
      //Eliminate token from DB
      user.tokens = user.tokens.filter(checkToken);
      await user.save();
      res.send({ message: "Token eliminated" });
    } else {
      res.send({ message: "Token not on DB" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

//LOG OUT FROM ALL SESSIONS
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send();
  } catch (e) {
    req.status(500).send();
  }
});

//GET OWN PROFILE. NOT USED AT THE MOMENT
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//GET USER PROFILE
router.get("/users/:name", async (req, res) => {
  const user_name = req.params.name;

  try {
    const user = await User.findOne({ user_name });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//GET ALL USERS. NOT USED AT THE MOMENT
router.get("/users/", auth, async (req, res) => {
  User.find({});

  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

//UPDATE A USER
router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "user_name",
    "full_name",
    "password",
    "birthday",
    "description",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send(e);
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//DELETE A USER
router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

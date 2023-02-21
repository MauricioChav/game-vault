const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const Game = require("../models/game");
const Review = require("../models/review");
const auth = require("../Middleware/auth");
const developerValidation = require("../Middleware/developerValidation");
const reviewerValidation = require("../Middleware/reviewerValidation");

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

//GET USER PROFILE
router.get("/users/me", auth, async (req, res) => {
  res.send({ user: req.user, user_email: req.user.email });
});

//GET USER PROFILE
router.get("/users/:name", async (req, res) => {
  const user_name = req.params.name;

  try {
    //Populate the user with their games. Only brings basic game info
    const user = await User.findOne({ user_name }).populate(
      "games",
      "_id title short_title cover_image scores"
    );

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

//UPDATE USER
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "user_name",
    "legal_name",
    "password",
    "birthday",
    "about_me",
    "img_profile",
    "img_banner",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//DELETE DEVELOPER USER
router.delete(
  "/users/developer/me",
  [auth, developerValidation],
  async (req, res) => {
    const user = req.user;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      //Find all the developer games and save their ids in an array
      const games = await Game.find({ developer_id: user._id });

      const gameIds = games.map((game) => {
        return game._id.toString();
      });

      //Delete all of the reviews that belong to the developer's games
      await Review.deleteMany({ game_id: { $in: gameIds } }, { session });

      //Delete all of the games from the user
      await Game.deleteMany({ developer_id: user._id }, { session });

      //Delete the user
      await user.remove({ session });

      await session.commitTransaction();
      session.endSession();
      res.send(user);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).send();
    }
  }
);

//DELETE REVIEWER USER
router.delete(
  "/users/reviewer/me",
  [auth, reviewerValidation],
  async (req, res) => {
    const user = req.user;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      //Find all the reviews made by the user
      const reviews = await Review.find({ reviewer_id: user._id });

      //Update all of the reviewed games' scores
      await Game.bulkWrite(
        reviews.map((review) => {
          return {
            updateOne: {
              filter: { _id: review.game_id },
              update: {
                $inc: {
                  sum_score_general: -review.score_general,
                  sum_score_gameplay: -review.score_gameplay,
                  sum_score_graphics: -review.score_graphics,
                  sum_score_sound: -review.score_sound,
                  sum_score_narrative: -review.score_narrative,
                },
              },
            },
          };
        }),
        { session }
      );

      //Delete all of the reviews from the user
      await Review.deleteMany({ reviewer_id: user._id }, { session });

      //Delete the user
      await user.remove({ session });

      await session.commitTransaction();
      session.endSession();
      res.send(user);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      console.log(e);
      res.status(500).send();
    }
  }
);

module.exports = router;

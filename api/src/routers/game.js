const express = require("express");
const Game = require("../models/game");
const User = require("../models/user");
const Review = require("../models/review");
const auth = require("../Middleware/auth");
const typeValidation = require("../Middleware/developerValidation");
const { default: mongoose } = require("mongoose");

const router = new express.Router();

//CREATE GAME
router.post("/games/", [auth, typeValidation], async (req, res) => {
  const fields = Object.keys(req.body);
  const allowedFields = [
    "title",
    "publisher",
    "release_date",
    "genres",
    "isSinglePlayer",
    "isMultiPlayer",
    "platforms",
    "cover_image",
    "synopsis",
    "gallery",
  ];
  const isValidOperation = fields.every((field) =>
    allowedFields.includes(field)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid data" });
  }

  const game = new Game({
    ...req.body,
    developer_id: req.user._id,
  });

  try {
    await game.save();
    res.status(201).send(game);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET ALL GAMES
router.get("/games/", async (req, res) => {
  try {
    const games = await Game.find({});
    res.send(games);
  } catch (e) {
    res.status(500).send();
  }
});

//GET DEVELOPER GAMES
router.get("/games/dev/:developer_name", async (req, res) => {
  const user_name = req.params.developer_name;

  //Get the developer info
  try {
    const user = await User.findOne({ user_name, user_type: 1 });

    //Validate if the user exist and is a developer
    if (!user) {
      return res.status(404).send();
    }

    //Get games with developer_id
    const developer_id = user._id;

    try {
      const games = await Game.find({ developer_id });
      res.send({
        user: {
          _id: developer_id,
          legal_name: user.legal_name,
        },
        games,
      });
    } catch (e) {
      res.status(500).send();
    }
  } catch (e) {
    res.status(500).send();
  }
});

//GET GAME
router.get("/games/:short_title", async (req, res) => {
  const short_title = req.params.short_title;

  try {
    const game = await Game.findOne({ short_title })
      .populate("developer_id", "_id user_name legal_name")
      .populate("review_count");

    if (!game) {
      return res.status(404).send();
    }

    res.send(game);
  } catch (e) {
    res.status(500).send();
  }
});

//UPDATE GAME
router.patch("/games/:id", [auth, typeValidation], async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "publisher",
    "release_date",
    "genres",
    "isSinglePlayer",
    "isMultiPlayer",
    "platforms",
    "cover_image",
    "synopsis",
    "gallery",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const game = await Game.findOne({
      _id: req.params.id,
      developer_id: req.user._id,
    });

    if (!game) {
      return res.status(404).send();
    }

    updates.forEach((update) => (game[update] = req.body[update]));
    await game.save();

    res.send(game);
  } catch (e) {
    res.status(400).send(e);
  }
});

//DELETE GAME
router.delete("/games/:id", [auth, typeValidation], async (req, res) => {
  const _id = req.params.id;
  try {
    const game = await Game.findOne({
      _id,
      developer_id: req.user._id,
    });

    if (!game) {
      return res.status(404).send();
    }

    //Delete game and all of its reviews
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const game = await Game.findOneAndDelete(
        { _id, developer_id: req.user._id },
        { session }
      );

      await Review.deleteMany({ game_id: _id }, { session });

      await session.commitTransaction();
      session.endSession();
      res.send(game);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).send();
    }
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

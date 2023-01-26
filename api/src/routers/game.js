const express = require("express");
const Game = require("../models/game");
const auth = require("../Middleware/auth");
const typeValidation = require("../Middleware/developerValidation")
const router = new express.Router();

//Games router

//CREATE GAME
router.post("/games/", [auth, typeValidation], async (req, res) => {
  const game = new Game({
    ...req.body,
    developer_id: req.user._id
  })

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

//GET ALL DEVELOPER GAMES
//NOT YET FUNCTIONAL
router.get("/games/dev", async (req, res) => {
  Game.find({});

  try {
    const games = await Game.find({});
    res.send(games);
  } catch (e) {
    res.status(500).send();
  }
});

//GET GAME
router.get("/games/:short_title", async (req, res) => {
  const short_title = req.params.short_title;

  try {
    const game = await Game.findOne({short_title});

    if (!game) {
      return res.status(404).send();
    }

    //Get developer info
    await game.populate("developer_id");

    res.send(game);
  } catch (e) {
    res.status(500).send();
  }
});

//UPDATE GAME
router.patch("/games/:id", auth, async (req, res) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "developers",
    "producers",
    "release_date",
    "genres",
    "player_count",
    "plattforms",
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
    const game = await Game.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!game) {
      return res.status(404).send(e);
    }

    res.send(game);
  } catch (e) {
    res.status(400).send(e);
  }
});

//DELETE GAME
router.delete("/games/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const game = await Game.findByIdAndDelete(_id);

    if (!game) {
      return res.status(404).send();
    }

    res.send(game);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;

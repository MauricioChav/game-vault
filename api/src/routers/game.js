const express = require("express");
const Game = require("../models/game");

const router = new express.Router();

//Users router

//GET ALL GAMES
router.get("/games/", async (req, res) => {
  User.find({});

  try {
    const games = await Game.find({});
    res.send(games);
  } catch (e) {
    res.status(500).send();
  }
});

//GET A USER
router.get("/games/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const game = await Game.findById(_id);

    if (!game) {
      return res.status(404).send();
    }

    res.send(game);
  } catch (e) {
    res.status(500).send();
  }
});

//POST A USER
router.post("/games/", async (req, res) => {
  const game = new Game(req.body);

  try {
    await game.save();
    res.status(201).send(game);
  } catch (e) {
    res.status(400).send(e);
  }
});

//UPDATE A USER
router.patch("/games/:id", async (req, res) => {
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

//DELETE A USER
router.delete("/games/:id", async (req, res) => {
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

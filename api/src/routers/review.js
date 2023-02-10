const express = require("express");
const Review = require("../models/review");
const Game = require("../models/game");
const auth = require("../Middleware/auth");
const typeValidation = require("../Middleware/reviewerValidation");
const router = new express.Router();

//CREATE REVIEW
router.post("/reviews/:game_id", [auth, typeValidation], async (req, res) => {
  const game_id = req.params.game_id;
  const reviewer_id = req.user._id;

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "game_id",
    "reviewer_id",
    "review_body",
    "recommendation",
    "spoilers",
    "score_general",
    "score_gameplay",
    "score_graphics",
    "score_sound",
    "score_narrative",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    //Verify that there isn't an already existing review matching both user and game
    //User can only make 1 review per game
    const existingReview = await Review.findOne({ reviewer_id, game_id });

    if (existingReview) {
      return res
        .status(400)
        .send({ error: "A user can only make 1 review per game" });
    }

    const review = new Review({
      ...req.body,
      reviewer_id,
      game_id,
    });

    //Create new review
    try {
      await review.save();
      res.status(201).send(review);
    } catch (e) {
      res.status(400).send(e);
    }
  } catch (e) {
    res.status(400).send();
  }
});

//GET A GAME'S REVIEWS
router.get("/reviews/game/:game_id", async (req, res) => {
  const game_id = req.params.game_id;

  try {
    const reviews = await Review.find({ game_id }).populate(
      "reviewer_id",
      "_id user_name img_profile follower_count"
    );
    res.send(reviews);
  } catch (e) {
    res.status(500).send();
  }
});

//VERIFY IF THE USER HAS REVIEWED A GAME
router.get(
  "/reviews/verify/:game_id",
  [auth, typeValidation],
  async (req, res) => {
    const game_id = req.params.game_id;
    const reviewer_id = req.user._id;

    try {
      const review = await Review.findOne({ reviewer_id, game_id }).populate(
        "reviewer_id",
        "_id user_name img_profile follower_count"
      );

      res.send(review);
    } catch (e) {
      res.status(500).send();
    }
  }
);

//UPDATE REVIEW
router.patch("/reviews/:id", [auth, typeValidation], async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "review_body",
    "recommendation",
    "spoilers",
    "score_general",
    "score_gameplay",
    "score_graphics",
    "score_sound",
    "score_narrative",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).send(e);
    }

    updates.forEach((update) => (review[update] = req.body[update]));
    await review.save();

    res.send(review);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

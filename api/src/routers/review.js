const express = require("express");
const Review = require("../models/review");
const Game = require("../models/game");
const User = require("../models/user");
const auth = require("../Middleware/auth");
const typeValidation = require("../Middleware/reviewerValidation");
const { default: mongoose } = require("mongoose");
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

    //Create new review and update the game score (Using a transaction)
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const game = await Game.findById(game_id);

      await Game.findByIdAndUpdate(
        game_id,
        {
          sum_score_general: game.sum_score_general + req.body.score_general,
          sum_score_gameplay: game.sum_score_gameplay + req.body.score_gameplay,
          sum_score_graphics: game.sum_score_graphics + req.body.score_graphics,
          sum_score_sound: game.sum_score_sound + req.body.score_sound,
          sum_score_narrative:
            game.sum_score_narrative + req.body.score_narrative,
        },

        { session }
      );

      await review.save({ session });

      await session.commitTransaction();
      session.endSession();
      res.status(201).send(review);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).send();
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

//GET A USER'S REVIEWS
router.get("/reviews/user/:user_name", async (req, res) => {
  const user_name = req.params.user_name;

  try {
    const user = await User.findOne({ user_name, user_type: 0 });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    try {
      const reviews = await Review.find({ reviewer_id: user._id }).populate(
        "game_id",
        "_id title short_title developer_id cover_image"
      );
      res.send(reviews);
    } catch (e) {
      res.status(500).send();
    }
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
    const review = await Review.findOne({
      _id: req.params.id,
      reviewer_id: req.user._id,
    });

    if (!review) {
      return res.status(404).send();
    }

    //Update the review and update the game score (Using a transaction)
    const old_review = review;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const game = await Game.findById(review.game_id);

      //Substract the old value to the sum and add the new one
      await Game.findByIdAndUpdate(
        review.game_id,
        {
          sum_score_general:
            game.sum_score_general -
            old_review.score_general +
            req.body.score_general,
          sum_score_gameplay:
            game.sum_score_gameplay -
            old_review.score_gameplay +
            req.body.score_gameplay,
          sum_score_graphics:
            game.sum_score_graphics -
            old_review.score_graphics +
            req.body.score_graphics,
          sum_score_sound:
            game.sum_score_sound -
            old_review.score_sound +
            req.body.score_sound,
          sum_score_narrative:
            game.sum_score_narrative -
            old_review.score_narrative +
            req.body.score_narrative,
        },

        { session }
      );

      updates.forEach((update) => (review[update] = req.body[update]));
      await review.save({ session });

      await session.commitTransaction();
      session.endSession();
      res.send(review);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//DELETE REVIEW
router.delete("/reviews/:id", [auth, typeValidation], async (req, res) => {
  const _id = req.params.id;
  try {
    const review = await Review.findOne({
      _id,
      reviewer_id: req.user._id,
    });

    if (!review) {
      return res.status(404).send();
    }

    //Delete review and update the game score (Using a transaction)
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const game = await Game.findById(review.game_id);

      await Game.findByIdAndUpdate(
        review.game_id,
        {
          sum_score_general: game.sum_score_general - review.score_general,
          sum_score_gameplay: game.sum_score_gameplay - review.score_gameplay,
          sum_score_graphics: game.sum_score_graphics - review.score_graphics,
          sum_score_sound: game.sum_score_sound - review.score_sound,
          sum_score_narrative:
            game.sum_score_narrative - review.score_narrative,
        },

        { session }
      );

      const deleted_review = await Review.findOneAndDelete(
        {
          _id,
          reviewer_id: req.user._id,
        },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      res.send(deleted_review);
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

const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Game",
  },
  reviewer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  review_body: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    min: 0,
    default: 0,
  },
  dislikes: {
    type: Number,
    min: 0,
    default: 0,
  },
  score_general: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
  },
  score_gameplay: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
  },
  score_graphics: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
  },
  score_sound: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
  },
  score_narrative: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

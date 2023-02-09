const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
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
      maxLength: 500
    },
    recommendation: {
      type: Number,
      required: true,
      min: 0,
      max: 2,
      default: 0,
    },
    spoilers: {
      type: Boolean,
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
      min: 0.5,
      max: 5,
      default: 1,
    },
    score_gameplay: {
      type: Number,
      min: 0.5,
      max: 5,
      default: 1,
    },
    score_graphics: {
      type: Number,
      min: 0.5,
      max: 5,
      default: 1,
    },
    score_sound: {
      type: Number,
      min: 0.5,
      max: 5,
      default: 1,
    },
    score_narrative: {
      type: Number,
      min: 0.5,
      max: 5,
      default: 1,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 0,
  },
  short_title: {
    type: String,
    required: true,
    trim: true,
  },
  developer: {
    type: String,
    required: true,
    trim: true,
  },
  release_date: {
    type: Date,
    required: true
  },
  genres: {
    type: [String],
    required: true,
  },
  player_count: {
    type: String,
    required: true
  },
  plattforms: {
    type: [String],
    required: true
  },
  cover_image: {
    type: String,
  },
  genres: {
    type: [String],
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  gallery: {
    type: [String],
  },
  score_general: {
    type: Number,
  },
  score_gameplay: {
    type: Number,
  },
  score_graphics: {
    type: Number,
  },
  score_sound: {
    type: Number,
  },
  score_narrative: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      default: 0,
    },
    developers: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    producers: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    release_date: {
      type: Date,
      required: true,
    },
    genres: [
      {
        genre: {
          type: String,
          required: true,
        },
      },
    ],
    player_count: {
      type: String,
      required: true,
    },
    plattforms: [
      {
        plattform: {
          type: String,
          required: true,
        },
      },
    ],
    cover_image: {
      type: String,
    },
    synopsis: {
      type: String,
    },
    gallery: [
      {
        img: {
          type: String,
          required: true,
        },
      },
    ],
    score: [
      {
        general: {
          type: Number,
          min: 1,
          max: 10
        },
        gameplay: {
          type: Number,
          min: 1,
          max: 10
        },
        graphics: {
          type: Number,
          min: 1,
          max: 10
        },
        sound: {
          type: Number,
          min: 1,
          max: 10
        },
        narrative: {
          type: Number,
          min: 1,
          max: 10
        },
      },
    ],
  },
  {
    virtuals: {
      short_title: {
        get() {
          return this.title.replaceAll(" ", "_");
        },
      },
    },
  }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

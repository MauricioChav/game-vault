const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  short_title: {
    type: String,
  },
  developer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  publisher: {
    type: String,
    required: true,
    trim: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  genres: [
    {
      type: String,
      required: true,
    },
  ],
  isSinglePlayer: {
    type: Boolean,
    required: true,
  },
  isMultiPlayer: {
    type: Boolean,
    required: true,
  },
  platforms: [
    {
      type: String,
      required: true,
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
      name: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
  ],

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

//Set the short_title when you create/edit the title
gameSchema.pre("save", async function (next) {
  const game = this;

  if (game.isModified("title")) {
    game.short_title = game.title.replaceAll(" ", "_");
  }

  next();
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

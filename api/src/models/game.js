const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
  {
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

    sum_score_general: {
      type: Number,
      min: 0,
      default: 0,
    },
    sum_score_gameplay: {
      type: Number,
      min: 0,
      default: 0,
    },
    sum_score_graphics: {
      type: Number,
      min: 0,
      default: 0,
    },
    sum_score_sound: {
      type: Number,
      min: 0,
      default: 0,
    },
    sum_score_narrative: {
      type: Number,
      min: 0,
      default: 0,
    },

    review_count: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    virtuals: {
      scores: {
        get() {
          if(this.review_count > 0){
            return {
              score_general: this.sum_score_general/this.review_count,
              score_gameplay: this.sum_score_gameplay/this.review_count,
              score_graphics: this.sum_score_graphics/this.review_count,
              score_sound: this.sum_score_sound/this.review_count,
              score_narrative: this.sum_score_narrative/this.review_count,
            }
          }else{
            return{
              score_general: 0,
              score_gameplay: 0,
              score_graphics: 0,
              score_sound: 0,
              score_narrative: 0
            }
          }
        },
      },
    },
  }
);

//Schema options allow to bring the virtuals into the response automatically. They also allow for deep population of getters
gameSchema.set("toJSON", { getters: true, virtuals: true });
gameSchema.set("toObject", { getters: true, virtuals: true });

//Hide unimportant information in the response
gameSchema.methods.toJSON = function () {
  const game = this;
  const gameObject = game.toObject();

  delete gameObject.sum_score_general;
  delete gameObject.sum_score_gameplay;
  delete gameObject.sum_score_graphics;
  delete gameObject.sum_score_sound;
  delete gameObject.sum_score_narrative;

  return gameObject;
};

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

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    user_type: {
      type: Number,
      required: true,
      default: 0
    },
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    full_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
    },
    birthday: {
      type: Date
    },
    description: {
      type: String,
      trim: true
    },
    follower_count: {
      type: Number
    }
  
  });
  
  const User = mongoose.model("User", userSchema);

  module.exports = User;
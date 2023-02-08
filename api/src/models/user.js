const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    user_type: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
      default: 0,
    },
    user_name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      maxlenght: 20,
      validate(value) {
        if (/\s/.test(value)) {
          throw new Error("The username can't have any white space.");
        }
      },
    },
    legal_name: {
      type: String,
      maxlenght: 30,
      trim: true,
      default: "",
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
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("The password cannot contain the word 'password'.");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    birthday: {
      type: Date,
      required: true,
    },
    about_me: {
      type: String,
      default: "",
    },
    img_profile: {
      type: String,
      trim: true,
      default: "",
    },
    img_banner: {
      type: String,
      trim: true,
      default: "",
    },
    follower_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Schema options allow to bring the virtuals into the response automatically. They also allow for deep population of getters
userSchema.set("toJSON", { getters: true, virtuals: true });
userSchema.set("toObject", { getters: true, virtuals: true });

userSchema.virtual("games", {
  ref: "Game",
  localField: "_id",
  foreignField: "developer_id",
});

userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "reviewer_id",
});

//Hide important information in the response
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  //Hide email
  //**Set email to only show on create user or edit user
  delete userObject.email;

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//Generate an Auth token
//Token duration set in "expiresIn"
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    "PasscurrentSecretActive",
    { expiresIn: "1d" }
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//Find user by credentials for the login
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

//Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

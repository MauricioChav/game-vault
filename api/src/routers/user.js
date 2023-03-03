const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const Game = require("../models/game");
const Review = require("../models/review");
const auth = require("../Middleware/auth");
const developerValidation = require("../Middleware/developerValidation");
const reviewerValidation = require("../Middleware/reviewerValidation");

const router = new express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *
 *        user_type:
 *          type: integer
 *          description: The user type. 0 for reviewer and 1 for developer.
 *
 *        user_name:
 *          type: string
 *          description: The user name. No spaces allowed.
 *
 *        legal_name:
 *          type: string
 *          description: The user legal name. Spaces are allowed. Only applies for developer accounts.
 *
 *        email:
 *          type: string
 *          description: The user email. Needs to be unique, and cannot be changed.
 *
 *        password:
 *          type: string
 *          description: The user password. Must contain at least 7 characters. Its value cannot be password.
 *
 *        birthday:
 *          type: date
 *          description: The user birthday.
 *
 *        about_me:
 *          type: string
 *          description: The user about me. It is presented in the profile section.
 *
 *        img_profile:
 *          type: string
 *          description: The user profile image.
 *
 *        img_banner:
 *          type: string
 *          description: The user banner image. Only avaiable for developer accounts.
 *
 *        follower_count:
 *          type: integer
 *          description: The user amount of followers. The user cannot modify its own follower count.
 *
 *        createdAt:
 *          type: date
 *          description: The date in which the user was created. Cannot be modified.
 *
 *        updatedAt:
 *          type: date
 *          description: The date in which the user was last modified.
 *
 *      example:
 *        _id: 1
 *        user_type: 1
 *        user_name: ElectronicGames
 *        legal_name: Electronic Games
 *        email: electronicgames@mail.com
 *        birthday: 1997-05-23
 *        about_me: This is my profile
 *        img_profile: https://lumiere-a.akamaihd.net/v1/images/marvelspidermanseries-emeagrid_45274dc0.jpeg?region=240,0,480,480
 *        img_banner: img
 *        follower_count: 0
 *        createdAt: 2023-03-02T19:18:26.719Z
 *        updatedAt: 2023-03-02T19:18:26.719Z
 *
 *  examples:
 *    userLogin:
 *      value:
 *        user:
 *          _id: 1
 *          user_type: 1
 *          user_name: ElectronicGames
 *          legal_name: Electronic Games
 *          birthday: 1997-05-23
 *          about_me: This is my profile
 *          img_profile: https://lumiere-a.akamaihd.net/v1/images/marvelspidermanseries-emeagrid_45274dc0.jpeg?region=240,0,480,480
 *          img_banner: ""
 *          follower_count: 0
 *          createdAt: 2023-03-02T19:18:26.719Z
 *          updatedAt: 2023-03-02T19:18:26.740Z
 *        token: d45sd5sd51sdMSAJND
 *      summary: Sample of a succesful user login
 * 
 *    userOwnProfile:
 *      value:
 *        user:
 *          _id: 1
 *          user_type: 1
 *          user_name: ElectronicGames
 *          legal_name: Electronic Games
 *          birthday: 1997-05-23
 *          about_me: This is my profile
 *          img_profile: https://lumiere-a.akamaihd.net/v1/images/marvelspidermanseries-emeagrid_45274dc0.jpeg?region=240,0,480,480
 *          img_banner: ""
 *          follower_count: 0
 *          createdAt: 2023-03-02T19:18:26.719Z
 *          updatedAt: 2023-03-02T19:18:26.740Z
 *        user_email: electronicgames@mail.com
 *      summary: Sample of a logged in user profile. Includes the email
 * 
 *    userProfile:
 *      value:
 *        _id: 1
 *        user_type: 1
 *        user_name: ElectronicGames
 *        legal_name: Electronic Games
 *        birthday: 1997-05-23
 *        about_me: This is my profile
 *        img_profile: https://lumiere-a.akamaihd.net/v1/images/marvelspidermanseries-emeagrid_45274dc0.jpeg?region=240,0,480,480
 *        img_banner: ""
 *        follower_count: 0
 *        createdAt: 2023-03-02T19:18:26.719Z
 *        updatedAt: 2023-03-02T19:18:26.740Z
 *      summary: Sample of a user profile fetched
 *
 *  responses:
 *    UnauthorizedError:
 *      description: Error. The path requires to be logged in.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: sting
 *          example:
 *            error: Please authenticate
 * 
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * 
 *
 */

//CREATE A USER/ SIGN UP
/**
 * @swagger
 * /users:
 *  post:
 *    summary: Creates a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        description: Returns the created User. Also returns a JWT Token.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/User'
 *                token:
 *                  type: string
 *                  description: JWT Token
 *            examples:
 *                userLogin:
 *                  $ref: '#/components/examples/userLogin'
 *      400:
 *        description: Bad request
 */
router.post("/users/", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//LOG IN
/**
 * @swagger
 * /users/login:
 *  post:
 *    summary: Log in with a user account
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: The user email.
 *              password:
 *                type: string
 *                description: The user password.
 *            example:
 *              email: electronicgames@mail.com
 *              password: 12345678
 *
 *    responses:
 *      200:
 *        description: User logged in succesfully. Returns a JWT Token.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/User'
 *                token:
 *                  type: string
 *                  description: JWT Token
 *            examples:
 *                userLogin:
 *                  $ref: '#/components/examples/userLogin'
 *      400:
 *        description: Bad request
 */
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

//LOG OUT
/**
 * @swagger
 * /users/logout:
 *  post:
 *    summary: Log out from the current session
 *    security:
 *      - bearerAuth: []
 *    tags: [User]
 *    responses:
 *      200:
 *        description: User logged out succesfully.
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        description: Server error
 */
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//LOG OUT FROM ALL SESSIONS
/**
 * @swagger
 * /users/logoutAll:
 *  post:
 *    summary: Log out from all user sessions
 *    security:
 *      - bearerAuth: []
 *    tags: [User]
 *    responses:
 *      200:
 *        description: User logged out from all sessions succesfully.
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        description: Server error
 */
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send();
  } catch (e) {
    req.status(500).send();
  }
});

//VALIDATE USER
/**
 * @swagger
 * /users/validate:
 *  get:
 *    summary: Validate if the user is logged in
 *    security:
 *      - bearerAuth: []
 *    tags: [User]
 *    responses:
 *      200:
 *        description: User is logged in.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *            example:
 *              message: User validated correctly
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/users/validate", auth, async (req, res) => {
  res.send({ message: "User validated correctly" });
});

//ELIMINATE TOKEN IF IT IS ON DB
router.post("/users/deletedbtoken", async (req, res) => {
  const user = await User.findById(req.body._id);
  const token = req.body.token;

  //Function to verify if the token is on the DB
  const checkToken = (tokenCheck) => {
    return tokenCheck.token !== token;
  };

  try {
    //If it returns false, the token still exists
    if (!user.tokens.every(checkToken)) {
      //Eliminate token from DB
      user.tokens = user.tokens.filter(checkToken);
      await user.save();
      res.send({ message: "Token eliminated" });
    } else {
      res.send({ message: "Token not on DB" });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET USER PROFILE
/**
 * @swagger
 * /users/me:
 *  get:
 *    summary: Get logged in user profile
 *    security:
 *      - bearerAuth: []
 *    tags: [User]
 *    responses:
 *      200:
 *        description: User profile fetched.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/User'
 *                user_email:
 *                  type: string
 *                  description: User email
 *            examples:
 *                userOwnProfile:
 *                  $ref: '#/components/examples/userOwnProfile'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/users/me", auth, async (req, res) => {
  res.send({ user: req.user, user_email: req.user.email });
});

//GET USER PROFILE
/**
 * @swagger
 * /users/{userName}:
 *  get:
 *    summary: Get a user profile
 *    parameters:
 *      - name: userName
 *        in: path
 *        description: The name of the user that you are trying to get.
 *        required: true
 *    tags: [User]
 *    responses:
 *      200:
 *        description: User profile fetched.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  $ref: '#/components/schemas/User'
 *                user_email:
 *                  type: string
 *                  description: User email
 *            examples:
 *                userProfile:
 *                  $ref: '#/components/examples/userProfile'
 *      404:
 *        description: User not found
 *      500:
 *        description: Server error
 */
router.get("/users/:name", async (req, res) => {
  const user_name = req.params.name;

  try {
    //Populate the user with their games. Only brings basic game info
    const user = await User.findOne({ user_name }).populate(
      "games",
      "_id title short_title cover_image scores"
    );

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//GET ALL USERS. NOT USED AT THE MOMENT
router.get("/users/", auth, async (req, res) => {
  User.find({});

  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

//UPDATE USER
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "user_name",
    "legal_name",
    "password",
    "birthday",
    "about_me",
    "img_profile",
    "img_banner",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//DELETE DEVELOPER USER
router.delete(
  "/users/developer/me",
  [auth, developerValidation],
  async (req, res) => {
    const user = req.user;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      //Find all the developer games and save their ids in an array
      const games = await Game.find({ developer_id: user._id });

      const gameIds = games.map((game) => {
        return game._id.toString();
      });

      //Delete all of the reviews that belong to the developer's games
      await Review.deleteMany({ game_id: { $in: gameIds } }, { session });

      //Delete all of the games from the user
      await Game.deleteMany({ developer_id: user._id }, { session });

      //Delete the user
      await user.remove({ session });

      await session.commitTransaction();
      session.endSession();
      res.send(user);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).send();
    }
  }
);

//DELETE REVIEWER USER
router.delete(
  "/users/reviewer/me",
  [auth, reviewerValidation],
  async (req, res) => {
    const user = req.user;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      //Find all the reviews made by the user
      const reviews = await Review.find({ reviewer_id: user._id });

      //Update all of the reviewed games' scores
      await Game.bulkWrite(
        reviews.map((review) => {
          return {
            updateOne: {
              filter: { _id: review.game_id },
              update: {
                $inc: {
                  sum_score_general: -review.score_general,
                  sum_score_gameplay: -review.score_gameplay,
                  sum_score_graphics: -review.score_graphics,
                  sum_score_sound: -review.score_sound,
                  sum_score_narrative: -review.score_narrative,
                },
              },
            },
          };
        }),
        { session }
      );

      //Delete all of the reviews from the user
      await Review.deleteMany({ reviewer_id: user._id }, { session });

      //Delete the user
      await user.remove({ session });

      await session.commitTransaction();
      session.endSession();
      res.send(user);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      console.log(e);
      res.status(500).send();
    }
  }
);

module.exports = router;

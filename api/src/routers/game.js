const express = require("express");
const { default: mongoose } = require("mongoose");
const Game = require("../models/game");
const User = require("../models/user");
const Review = require("../models/review");
const auth = require("../Middleware/auth");
const typeValidation = require("../Middleware/developerValidation");

const router = new express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Game:
 *      type: object
 *      properties:
 *
 *        title:
 *          type: string
 *          description: The game title. Can include spaces.
 *
 *        short_title:
 *          type: string
 *          description: The game short title. Spaces are replaced with "_". Is generated automatically based on the title.
 *
 *        developer_id:
 *          type: string
 *          description: The user legal name. Spaces are allowed. Only applies for developer accounts.
 *
 *        publisher:
 *          type: string
 *          description: The game publisher.
 *
 *        release_date:
 *          type: string
 *          format: date
 *          description: The game release date.
 *
 *        genres:
 *          type: array
 *          items:
 *            type: string
 *          description: The game genres.
 *          
 *
 *        isSinglePlayer:
 *          type: boolean
 *          description: The game has Single-Player mode.
 *
 *        isMultiPlayer:
 *          type: boolean
 *          description: The game has Multi-Player mode.
 *
 *        platforms:
 *          type: string
 *          description: The user banner image. Only avaiable for developer accounts.
 *
 *        cover_image:
 *          type: string
 *          description: The game cover image.
 * 
 *        synopsis:
 *          type: string
 *          description: Summary of the game.
 *  
 *        gallery:
 *          type: string
 *          description: The game gallery of images.
 * 
 *        review_count:
 *          type: integer
 *          description: The game amount of reviews.
 * 
 *        score_general:
 *          type: number
 *          format: float
 *          description: The game average score in the general category.
 * 
 *        score_gameplay:
 *          type: number
 *          format: float
 *          description: The game average score in the gameplay category.
 * 
 *        score_graphics:
 *          type: number
 *          format: float
 *          description: The game average score in the graphics category.
 * 
 *        score_sound:
 *          type: number
 *          format: float
 *          description: The game average score in the sound and music category.
 * 
 *        score_narrative:
 *          type: number
 *          format: float
 *          description: The game average score in the narrative category.
 * 
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date in which the game was created. Cannot be modified.
 *
 *        updatedAt:
 *          type: string
 *          format: date
 *          description: The date in which the game was last modified.
 *
 *      example:
 *        title: Dead Space
 *        short_title: Dead_Space
 *        developer_id: ElectronicGames
 *        publisher: Electronic Games
 *        release_date: 2008-05-23
 *        genres: 1997-05-23
 *        isSinglePlayer: This is my profile
 *        isMultiPlayer: https://lumiere-a.akamaihd.net/v1/images/marvelspidermanseries-emeagrid_45274dc0.jpeg?region=240,0,480,480
 *        platforms: img
 *        cover_image: 0
 *        synopsis: This is the synopsis of the game.
 *        gallery: 2023-03-02T19:18:26.719Z
 *        review_count: 0
 *        score_general: 5
 *        score_gameplay: 5
 *        score_graphics: 5
 *        score_sound: 5
 *        score_narrative: 5
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
 *      description: The path requires to be logged in.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *          example:
 *            error: Please authenticate
 * 
 *    ForbiddenError:
 *      description: The user does not have the necessary permissions.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *          example:
 *            error: Your account doesn't have the necesary user permissions
 * 
 *    ServerError:
 *      description: Server error 
 * 
 *    RequestError:
 *      description: Bad request
 * 
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * 
 *
 */

//CREATE GAME
router.post("/games/", [auth, typeValidation], async (req, res) => {
  const fields = Object.keys(req.body);
  const allowedFields = [
    "title",
    "publisher",
    "release_date",
    "genres",
    "isSinglePlayer",
    "isMultiPlayer",
    "platforms",
    "cover_image",
    "synopsis",
    "gallery",
  ];
  const isValidOperation = fields.every((field) =>
    allowedFields.includes(field)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid data" });
  }

  const game = new Game({
    ...req.body,
    developer_id: req.user._id,
  });

  try {
    await game.save();
    res.status(201).send(game);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET ALL GAMES
router.get("/games/", async (req, res) => {
  try {
    const games = await Game.find({});
    res.send(games);
  } catch (e) {
    res.status(500).send();
  }
});

//GET DEVELOPER GAMES
router.get("/games/dev/:developer_name", async (req, res) => {
  const user_name = req.params.developer_name;

  //Get the developer info
  try {
    const user = await User.findOne({ user_name, user_type: 1 });

    //Validate if the user exist and is a developer
    if (!user) {
      return res.status(404).send();
    }

    //Get games with developer_id
    const developer_id = user._id;

    try {
      const games = await Game.find({ developer_id });
      res.send({
        user: {
          _id: developer_id,
          legal_name: user.legal_name,
        },
        games,
      });
    } catch (e) {
      res.status(500).send();
    }
  } catch (e) {
    res.status(500).send();
  }
});

//GET GAME
router.get("/games/:short_title", async (req, res) => {
  const short_title = req.params.short_title;

  try {
    const game = await Game.findOne({ short_title })
      .populate("developer_id", "_id user_name legal_name")
      .populate("review_count");

    if (!game) {
      return res.status(404).send();
    }

    res.send(game);
  } catch (e) {
    res.status(500).send();
  }
});

//UPDATE GAME
router.patch("/games/:id", [auth, typeValidation], async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "publisher",
    "release_date",
    "genres",
    "isSinglePlayer",
    "isMultiPlayer",
    "platforms",
    "cover_image",
    "synopsis",
    "gallery",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const game = await Game.findOne({
      _id: req.params.id,
      developer_id: req.user._id,
    });

    if (!game) {
      return res.status(404).send();
    }

    updates.forEach((update) => (game[update] = req.body[update]));
    await game.save();

    res.send(game);
  } catch (e) {
    res.status(400).send(e);
  }
});

//DELETE GAME
router.delete("/games/:id", [auth, typeValidation], async (req, res) => {
  const _id = req.params.id;
  try {
    const game = await Game.findOne({
      _id,
      developer_id: req.user._id,
    });

    if (!game) {
      return res.status(404).send();
    }

    //Delete game and all of its reviews (Using a transaction)
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      //Delete all of the reviews from the game
      await Review.deleteMany({ game_id: _id }, { session });

      //Delete game
      const game = await Game.findOneAndDelete(
        { _id, developer_id: req.user._id },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      res.send(game);
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

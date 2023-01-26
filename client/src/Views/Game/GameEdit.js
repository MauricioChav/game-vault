import React from "react";
import { useParams } from "react-router-dom";
import Card from "../../Components/Card/Card";
import moment from "moment";

function GameEdit() {
  //Get Game Data
  const route = useParams();
  const short_title = route.short_title;

  const gameHandler = async () => {
    console.log("Editing Game");
  };

  return (
    <Card className="text-center">
      <h1>
        {short_title == "new" ? "Create new Game" : "Edit " + short_title}
      </h1>

      <form className="" onSubmit={gameHandler}>
        {/* <div className="row">
          <div className="col-3">
            <label className="fname">Title:</label>
            <input type="text" id="title" name="title" />
          </div>
          <div className="col-3">
            <label className="fname">Developer:</label>
            <input type="text" value="T Electronic Arts" disabled />
          </div>
          <div className="col-3">
            <label className="fname">Publisher:</label>
            <input type="text" id="publisher" name="publisher" />
          </div>
          <div className="col-3">
            <label className="fname">Release Date:</label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              min="1900-01-01"
              max={moment().format("YYYY-MM-DD")}
              required={true}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label className="fname">Synopsis:</label>
            <textarea id="synopsis" name="synopsis"></textarea>
          </div>
          <div className="col-4">
            <label className="fname">Cover Image:</label>
            <input type="text" id="cover_image" name="cover_image" />
          </div>
          <div className="col-4">
            <label className="fname">Gallery:</label>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label className="fname">Genres:</label>
            <textarea id="genres" name="genres"></textarea>
          </div>
          <div className="col-3">
            <label className="fname">Mode(s):</label>
            <input
              type="checkbox"
              id="isSinglePlayer"
              name="isSinglePlayer"
              value={true}
            ></input>
            <p>Single-Player</p>
            <input
              type="checkbox"
              id="isMultiPlayer"
              name="isMultiPlayer"
              value={true}
            ></input>
            <p>Multiplayer</p>
          </div>
          <div className="col-4">
            <label className="fname">Platform(s):</label>
            <input type="checkbox" value="Playstation 5"></input>
            <p>Playstation 5</p>
            <input type="checkbox" value="Xbox Series X"></input>
            <p>Xbox Series X</p>
            <input type="checkbox" value="PC"></input>
            <p>PC</p>
          </div>
          <div className="col-4"></div>
        </div> */}

        <button className="submit-btn" type="submit">
          {short_title == "new" ? "Create new Game" : "Save Changes"}
        </button>
      </form>
    </Card>
  );
}

export default GameEdit;

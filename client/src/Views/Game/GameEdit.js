import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import NotificationCard, {
  NotificationMessage,
} from "../../Components/NotificationCard/NotificationCard";
import { useParams, useNavigate } from "react-router-dom";
import { nav_routes } from "../../routes";

import TagsInput from "react-tagsinput";

import { useCreateGameMutation } from "../../Api/gameEndpoints";

function GameEdit() {
  let navigate = useNavigate();
  const [createGame] = useCreateGameMutation();
  const [alert, setAlert] = useState({});
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  //Genre tags array
  const [genreTags, setGenreTags] = useState({ genres: [] });

  const handleGenreTags = (genres) => {
    setGenreTags({ genres });
  };

  //Validate if the user is logged in with a developer account (Both conditions should be met)
  useEffect(() => {
    if (
      loggedUser === null ||
      (loggedUser !== null && loggedUser.user.user_type !== 1)
    ) {
      navigate(nav_routes.HOME);
    }
  }, [loggedUser, navigate]);

  //Get Game Data for Edit Game
  const route = useParams();
  const short_title = route.short_title;

  const gameHandler = async (event) => {
    event.preventDefault();

    //Asign general data
    const title = event.target.elements.title.value;
    const publisher = event.target.elements.publisher.value;
    const release_date = event.target.elements.release_date.value;
    const synopsis = event.target.elements.synopsis.value;
    const cover_image = event.target.elements.cover_image.value;

    //GENRES

    //Send an error if there isn't at least one genre provided
    if (genreTags.genres.length <= 0)
      return setAlert(
        NotificationMessage("error", "Select at least one genre for the game")
      );

    //Asign genres
    const genres = genreTags.genres;

    //GAME MODES

    //Asign game modes
    const isSinglePlayer = event.target.elements.isSinglePlayer.checked;
    const isMultiPlayer = event.target.elements.isMultiPlayer.checked;

    //Send an error if both game modes are false
    if (!isSinglePlayer && !isMultiPlayer)
      return setAlert(
        NotificationMessage(
          "error",
          "Your game needs to have at least one game mode"
        )
      );

    //PLATFORMS

    //Asign platforms
    //Get an array with all the platforms that are selected
    const platformKeys = Object.keys(event.target.elements).filter(
      (element) => {
        return (
          element.startsWith("pt-") &&
          event.target.elements[element].checked === true
        );
      }
    );

    //Send an error if there isn't at least one platform provided
    if (platformKeys.length <= 0)
      return setAlert(
        NotificationMessage(
          "error",
          "Select at least one platform for the game"
        )
      );

    //Generate the array of values for the valid platforms
    const platforms = platformKeys.map((element) => {
      return event.target.elements[element].value;
    });

    //Create new game
    if (short_title === "new") {
      try {
        const newGame = await createGame({
          data: {
            title,
            publisher,
            release_date,
            synopsis,
            isSinglePlayer,
            isMultiPlayer,
            cover_image,
            genres,
            platforms,
          },
          token: loggedUser.token,
        }).unwrap();

        setAlert(NotificationMessage("success", "Game Added!"));

        //Redirect to the new game Page
        navigate(nav_routes.GAME + newGame.short_title);
        
      } catch (e) {
        if (e.hasOwnProperty("data.message")) {
          setAlert(NotificationMessage("error", e.data.message));
        } else {
          setAlert(
            NotificationMessage("error", "Error. Game Creation failed!")
          );
        }
      }
    } else {
      //Edit existing game
    }
  };

  return (
    <Card className="text-center">
      <h1>
        {short_title === "new" ? "Create new Game" : "Edit " + short_title}
      </h1>

      <NotificationCard notification={alert} />

      <form className="game-form" onSubmit={gameHandler}>
        <div className="row fg-space">
          <div className="col-12">
            <h3 className="fg-space">Basic Information</h3>
          </div>

          <div className="col-3">
            <label className="fg-label">Title:</label>
            <br></br>
            <input type="text" id="title" name="title" required />
          </div>
          <div className="col-3">
            <label className="fg-label">Developer:</label>
            <input type="text" value={loggedUser.user.legal_name} disabled />
          </div>
          <div className="col-3">
            <label className="fg-label">Publisher:</label>
            <input type="text" id="publisher" name="publisher" />
          </div>
          <div className="col-3">
            <label className="fg-label">Release Date:</label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              min="1900-01-01"
              required={true}
            />
          </div>
        </div>

        <div className="row fg-space">
          <div className="col-9">
            <label className="fg-label">Synopsis:</label>
            <textarea id="synopsis" name="synopsis"></textarea>
          </div>
          <div className="col-3">
            <label className="fg-label">Genres:</label>
            <TagsInput
              value={genreTags.genres}
              onChange={handleGenreTags}
              addKeys={[188]}
              inputProps={{ placeholder: "Add a genre" }}
            />
            <p>*Insert a genre with a comma</p>
          </div>
        </div>

        <div className="row fg-space">
          <div className="col-3">
            <label className="fg-label">Mode(s):</label>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input
                      className="i-checkbox"
                      type="checkbox"
                      id="isSinglePlayer"
                      name="isSinglePlayer"
                    ></input>
                    <label htmlFor="isSinglePlayer">Single-Player</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className="i-checkbox"
                      type="checkbox"
                      id="isMultiPlayer"
                      name="isMultiPlayer"
                    ></input>
                    <label htmlFor="isMultiPlayer">Multiplayer</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-6">
            <label className="fg-label">Platform(s):</label>
            <table id="tableTEST">
              <tbody>
                <tr>
                  <td>
                    <input
                      className="i-checkbox"
                      type="checkbox"
                      id="pt-playstation5"
                      name="pt-playstation5"
                      value="Playstation 5"
                    ></input>
                    <label htmlFor="pt-playstation5">Playstation 5</label>
                  </td>
                  <td>
                    <input
                      className="i-checkbox"
                      type="checkbox"
                      id="pt-xboxseriesx"
                      name="pt-xboxseriesx"
                      value="Xbox Series X"
                    ></input>
                    <label htmlFor="pt-xboxseriesx">Xbox Series X</label>
                  </td>
                  <td>
                    <input
                      className="i-checkbox"
                      type="checkbox"
                      id="pt-nintendoswitch"
                      name="pt-nintendoswitch"
                      value="Nintendo Switch"
                    ></input>
                    <label htmlFor="pt-nintendoswitch">Nintendo Switch</label>
                  </td>
                  <td>
                    <input
                      className="i-checkbox"
                      type="checkbox"
                      id="pt-pc"
                      name="pt-pc"
                      value="PC"
                    ></input>
                    <label htmlFor="PC">PC</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      className="i-checkbox"
                      type="checkbox"
                      id="pt-playstation4"
                      name="pt-playstation4"
                      value="Playstation 4"
                    ></input>
                    <label htmlFor="pt-playstation4">Playstation 4</label>
                  </td>
                  <td>
                    {" "}
                    <input
                      className="i-checkbox"
                      type="checkbox"
                      id="pt-xboxone"
                      name="pt-xboxone"
                      value="Xbox One"
                    ></input>
                    <label htmlFor="pt-xboxone">Xbox One</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row fg-space">
          <div className="col-12">
            <h3 className="fg-space">Images</h3>
          </div>
          <div className="col-4">
            <label className="fg-label">Cover Image:</label>
            <input type="text" id="cover_image" name="cover_image" />
          </div>
          <div className="col-4">
            <label className="fg-label">Gallery:</label>
          </div>
        </div>

        <button className="submit-btn" type="submit">
          {short_title === "new" ? "Create new Game" : "Save Changes"}
        </button>
      </form>
    </Card>
  );
}

export default GameEdit;

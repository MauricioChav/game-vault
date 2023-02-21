import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import NotificationCard, {
  NotificationMessage,
} from "../../Components/NotificationCard/NotificationCard";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import {
  useGetGameQuery,
  useCreateGameMutation,
  useUpdateGameMutation,
  useDeleteGameMutation,
} from "../../Api/gameEndpoints";

import TagsInput from "react-tagsinput";
import moment from "moment";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function GameEdit() {
  //Set basic variables
  const navigate = useNavigate();
  const [createGame] = useCreateGameMutation();
  const [updateGame] = useUpdateGameMutation();
  const [deleteGame] = useDeleteGameMutation();
  const [alert, setAlert] = useState({});
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  //Delete Alert
  const [openDelete, setOpenDelete] = React.useState(false);

  //Genre variables
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
  const route_title = route.route_title;
  const {
    data: game,
    isError,
    isLoading,
    error,
  } = useGetGameQuery(route_title);

  //Set the genres if it is an edit
  useEffect(() => {
    if (route_title !== "new" && !isError && !isLoading) {
      setGenreTags({ genres: game.genres });
    }
  }, [game, isError, isLoading, route_title]);

  //Edit view validation
  if (route_title !== "new") {
    if (isError) {
      console.log("Error", error);
      if (error.status === 404) {
        return (
          <Card className="text-center">
            <h1>The game you are trying to edit doesn't exist</h1>
            <br></br>
            <NavLink className="btn btn-info" to={nav_routes.GAME_EDIT + "new"}>
              Create new Game
            </NavLink>
          </Card>
        );
      } else {
        return (
          <Card className="text-center">
            <h1>There was an error with the server. Try later.</h1>
            <br></br>
            <NavLink className="btn btn-info" to={nav_routes.HOME}>
              Return to Home
            </NavLink>
          </Card>
        );
      }
    } else if (isLoading) {
      return (
        <Card className="text-center">
          <h1>Fetching game data...</h1>
        </Card>
      );
    } else {
      //Validate if the loggedUser is the owner game developer
      if (loggedUser.user._id !== game.developer_id._id) {
        navigate(nav_routes.HOME);
      }
    }
  }

  //EDIT GAME HANDLER
  const editGameHandler = async (event) => {
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
    if (route_title === "new") {
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
        navigate(0);
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
      try {
        const editGame = await updateGame({
          id: game._id,
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

        setAlert(NotificationMessage("success", "Game Edited Successfully!"));

        //Redirect to the new game Page after 1 seconds
        //The page needs to reload in order to update the cache
        setTimeout(() => {
          navigate(nav_routes.GAME + editGame.short_title);
          navigate(0);
        }, 800);
      } catch (e) {
        if (e.hasOwnProperty("data.message")) {
          setAlert(NotificationMessage("error", e.data.message));
        } else {
          console.log(error);
          setAlert(NotificationMessage("error", "Error. Game Edit failed!"));
        }
      }
    }
  };

  //DELETE GAME HANDLER
  const deleteGameHandler = async (event) => {
    event.preventDefault();

    try {
      await deleteGame({
        id: game._id,
        token: loggedUser.token,
      }).unwrap();

      handleClose();
      setAlert(NotificationMessage("success", "Game deleted successfully"));

      //Redirect to the games view after some time
      setTimeout(() => {
        navigate(nav_routes.PROFILE_DEV + loggedUser.user.user_name + "/games");
        navigate(0);
      }, 800);
    } catch (e) {
      if (e.hasOwnProperty("data.message")) {
        setAlert(NotificationMessage("error", e.data.message));
      } else {
        setAlert(NotificationMessage("error", "Error. Review Delete failed!"));
      }

      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  return (
    <Card className="text-center">
      <h1>
        {route_title === "new" ? "Create new Game" : "Edit: " + game.title}
      </h1>

      <NotificationCard notification={alert} />

      <form className="large-form" onSubmit={editGameHandler}>
        <div className="row fg-space">
          <div className="col-12">
            <h3 className="fg-space">Basic Information</h3>
          </div>

          <div className="col-3">
            <label className="fg-label">Title:</label>
            <br></br>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={route_title !== "new" ? game.title : ""}
            />
          </div>
          <div className="col-3">
            <label className="fg-label">Developer:</label>
            <input type="text" value={loggedUser.user.legal_name} disabled />
          </div>
          <div className="col-3">
            <label className="fg-label">Publisher:</label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              required
              defaultValue={route_title !== "new" ? game.publisher : ""}
            />
          </div>
          <div className="col-3">
            <label className="fg-label">Release Date:</label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              min="1900-01-01"
              required
              defaultValue={
                route_title !== "new"
                  ? moment(game.release_date).format("YYYY-MM-DD")
                  : ""
              }
            />
          </div>
        </div>

        <div className="row fg-space">
          <div className="col-9">
            <label className="fg-label">Synopsis:</label>
            <textarea
              id="synopsis"
              name="synopsis"
              defaultValue={route_title !== "new" ? game.synopsis : ""}
            ></textarea>
          </div>
          <div className="col-3">
            <label className="fg-label">Genres:</label>
            <TagsInput
              value={genreTags.genres}
              onChange={handleGenreTags}
              addKeys={[188]}
              onlyUnique={true}
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
                      defaultChecked={
                        route_title !== "new" && game.isSinglePlayer
                      }
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
                      defaultChecked={
                        route_title !== "new" && game.isMultiPlayer
                      }
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
                      defaultChecked={
                        route_title !== "new" &&
                        game.platforms.includes("Playstation 5")
                      }
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
                      defaultChecked={
                        route_title !== "new" &&
                        game.platforms.includes("Xbox Series X")
                      }
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
                      defaultChecked={
                        route_title !== "new" &&
                        game.platforms.includes("Nintendo Switch")
                      }
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
                      defaultChecked={
                        route_title !== "new" && game.platforms.includes("PC")
                      }
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
                      defaultChecked={
                        route_title !== "new" &&
                        game.platforms.includes("Playstation 4")
                      }
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
                      defaultChecked={
                        route_title !== "new" &&
                        game.platforms.includes("Xbox One")
                      }
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
            <input
              type="text"
              id="cover_image"
              name="cover_image"
              defaultValue={route_title !== "new" ? game.cover_image : ""}
            />
          </div>
          <div className="col-4">
            <label className="fg-label">Gallery:</label>
          </div>
        </div>

        <button className="submit-btn" type="submit">
          {route_title === "new" ? "Create new Game" : "Save Changes"}
        </button>
      </form>
      <hr></hr>

      {route_title !== "new" && (
        <>
          <Dialog
            open={openDelete}
            onClose={handleClose}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            <DialogTitle id="delete-dialog-title">
              Do you want to delete the game "{game.title}" ?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-dialog-description">
                Deleting the game will permanently remove it from the database
                alongside all of its reviews. <br></br> Do you wish to continue?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button
                className="btn btn-danger"
                onClick={deleteGameHandler}
                autoFocus
              >
                Delete
              </button>
              <button className="btn btn-classic" onClick={handleClose}>
                Cancel
              </button>
            </DialogActions>
          </Dialog>

          <div className="row fg-space">
            <div className="col-12">
              <h3 className="fg-space">Delete game</h3>
              <button className="btn btn-danger" onClick={handleClickOpen}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

export default GameEdit;

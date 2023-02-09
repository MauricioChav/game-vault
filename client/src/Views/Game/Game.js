import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { nav_routes } from "../../routes";
import moment from "moment";

import Card from "../../Components/Card/Card";
import ImageSlide from "../../Components/ImageSlide/ImageSlide";
import ReviewWall from "../../Components/ReviewComponents/ReviewsWall";
import NewReview from "../../Components/ReviewComponents/NewReview";

import "./Game.css";

import { useGetGameQuery } from "../../Api/gameEndpoints";

function Game(props) {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  //Validate user type if the user is loggedIn
  let userType = -1;
  if (loggedUser !== null) {
    userType = loggedUser.user.user_type;
  }

  const route = useParams();
  const {
    data: game,
    isError,
    isLoading,
    error,
  } = useGetGameQuery(route.short_title);

  const errorContent = (
    <Card className="text-center">
      <h1 className="t-center" style={{ marginTop: "20px" }}>
        Game not found!
      </h1>
    </Card>
  );

  if (isError) {
    console.log("Error", error);
    return errorContent;
  } else if (isLoading) {
    return (
      <Card>
        <h1>Getting Game data...</h1>
      </Card>
    );
  }

  //Game dev validation
  let editGameContent = (
    <div className="col-12">
      <h2 className="game-title">{game.title}</h2>
    </div>
  );
  if (loggedUser !== null)
    if (loggedUser.user._id === game.developer_id._id)
      editGameContent = (
        <>
          <div className="col-10">
            <h2 className="game-title">{game.title}</h2>
          </div>
          <div className="col-2">
            <NavLink
              className="btn btn-small btn-info"
              to={nav_routes.GAME_EDIT + game.short_title}
            >
              Edit Game
            </NavLink>
          </div>
        </>
      );

  return (
    <Card>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <img
              className="cover-img"
              src={
                game.cover_image === "" || game.cover_image === undefined
                  ? "https://vglist.co/packs/media/images/no-cover-369ad8f0ea82dde5923c942ba1a26482.png"
                  : game.cover_image
              }
              alt={game.short_title}
            ></img>
          </div>
          <div className="col-7">
            <div className="row">{editGameContent}</div>

            <table className="info-table">
              <tbody>
                <tr>
                  <td>
                    <h4 style={{ fontWeight: "bold" }}>Developer:</h4>
                  </td>
                  <td>
                    <NavLink
                      to={nav_routes.PROFILE_DEV + game.developer_id.user_name}
                    >
                      <h4>{game.developer_id.legal_name}</h4>
                    </NavLink>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4 style={{ fontWeight: "bold" }}>Publisher:</h4>
                  </td>
                  <td>
                    <h4>{game.publisher}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4 style={{ fontWeight: "bold" }}>Release Date:</h4>
                  </td>
                  <td>
                    <h4>{moment(game.release_date).format("MMMM DD, YYYY")}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4 style={{ fontWeight: "bold" }}>Platforms:</h4>
                  </td>
                  <td>
                    <h4>
                      {game.platforms.map(
                        (platform, index) =>
                          platform +
                          (index + 1 < game.platforms.length ? ", " : "")
                      )}
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4 style={{ fontWeight: "bold" }}>Genres:</h4>
                  </td>
                  <td>
                    <h4>
                      {game.genres.map(
                        (genre, index) =>
                          genre + (index + 1 < game.genres.length ? ", " : "")
                      )}
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4 style={{ fontWeight: "bold" }}>No. of players:</h4>
                  </td>
                  <td>
                    <h4>
                      {game.isSinglePlayer
                        ? game.isMultiPlayer
                          ? "Single-Player, Multiplayer"
                          : "Single-Player"
                        : "Multiplayer"}
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
            <br></br>

            <table className="score-table">
              <tbody>
                <tr>
                  <td>
                    <h2>Score:</h2>
                  </td>
                  <td>
                    <h2>{game.scores.score_general}</h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Gameplay:</h4>
                  </td>
                  <td>
                    <h4>{game.scores.score_gameplay}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Graphics:</h4>
                  </td>
                  <td>
                    <h4>{game.scores.score_graphics}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Sound/Music:</h4>
                  </td>
                  <td>
                    <h4>{game.scores.score_sound}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4>Narrative:</h4>
                  </td>
                  <td>
                    <h4>{game.scores.score_narrative}</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-12 synopsis-div">
            <h1>Synopsis:</h1>
            <p>{game.synopsis}</p>
          </div>

          <div className="col-12">
            <ImageSlide title="Gallery" type="gallery" array={game.gallery} />
          </div>

          <div className="col-12">
            <h2>Reviews:</h2>
            {loggedUser !== null && userType === 0 && <NewReview game_id={game._id}/>}
            {loggedUser === null && (

                <NavLink
                  to={nav_routes.LOGIN}
                  className="btn btn-primary btn-big fg-space"
                >
                  Login to create a review
                </NavLink>

            )}

            <ReviewWall game_id={game._id} short_title={game.short_title} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Game;

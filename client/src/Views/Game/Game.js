import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { nav_routes } from "../../routes";
import moment from "moment";

import Card from "../../Components/Card/Card";
import ImageSlide from "../../Components/ImageSlide/ImageSlide";
// import ReviewBox from "../../Components/ReviewComponents/ReviewBox";
import NewReview from "../../Components/ReviewComponents/NewReview";

import "./Game.css";

import { useGetGameQuery } from "../../Api/gameEndpoints";

function Game(props) {
  const route = useParams();
  const { data, isError, isLoading, error } = useGetGameQuery(
    route.short_title
  );

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
    return <h1>Getting Game data...</h1>;
  }

  //Reviews
  // let reviewContent = <div></div>;

  // if (game_reviews.length !== 0) {
  //   reviewContent = (
  //     <>
  //       {game_reviews.map((review) => (
  //         <ReviewBox key={review._id} review_info={review} />
  //       ))}

  //       <NavLink
  //         to={nav_routes.REVIEWS + data.short_title}
  //         className="btn btn-big"
  //       >
  //         See all reviews
  //       </NavLink>
  //     </>
  //   );
  // } else {
  //   reviewContent = (
  //     <h5>
  //       Currently there are no reviews for this game. Be te first one to review
  //       it!
  //     </h5>
  //   );
  // }

  return (
    <Card>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <img
              className="cover-img"
              src={data.cover_image}
              alt={data.short_title}
            ></img>
          </div>
          <div className="col-7">
            <div className="row">
              <div className="col-10"><h2 className="game-title">{data.title}</h2></div>
              {/* <div className="col-2"><button className="btn btn-small btn-info">Edit Game</button></div> */}
            </div>
            

            <table className="info-table">
              <tbody>
                <tr>
                  <td>
                    <h4 style={{ fontWeight: "bold" }}>Developer:</h4>
                  </td>
                  <td>
                    <NavLink
                      to={nav_routes.PROFILE_DEV + data.developer_id.user_name}
                    >
                      <h4>{data.developer_id.legal_name}</h4>
                    </NavLink>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4 style={{ fontWeight: "bold" }}>Release Date:</h4>
                  </td>
                  <td>
                    <h4>{moment(data.release_date).format("MMMM DD, YYYY")}</h4>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h4 style={{ fontWeight: "bold" }}>Genres:</h4>
                  </td>
                  <td>
                    <h4>
                      {data.genres.map(
                        (genre, index) =>
                          genre + (index + 1 < data.genres.length ? ", " : "")
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
                      {data.isSinglePlayer
                        ? data.isMultiPlayer
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
                  <td><h2>Score:</h2></td>
                  <td><h2>{data.scores.score_general}</h2></td>
                </tr>
                <tr>
                  <td><h4>Gameplay:</h4></td>
                  <td><h4>{data.scores.score_gameplay}</h4></td>
                </tr>
                <tr>
                  <td><h4>Graphics:</h4></td>
                  <td><h4>{data.scores.score_graphics}</h4></td>
                </tr>
                <tr>
                  <td><h4>Sound/Music:</h4></td>
                  <td><h4>{data.scores.score_sound}</h4></td>
                </tr>
                <tr>
                  <td><h4>Narrative:</h4></td>
                  <td><h4>{data.scores.score_narrative}</h4></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-12 synopsis-div">
            <h1>Synopsis:</h1>
            <p>{data.synopsis}</p>
          </div>

          <div className="col-12">
            <ImageSlide title="Gallery" type="gallery" array={data.gallery} />
          </div>

          <div className="col-12">
            <h2>Reviews:</h2>
            <NewReview />
            {/* {reviewContent} */}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Game;

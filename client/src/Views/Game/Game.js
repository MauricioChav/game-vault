import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { nav_routes } from "../../routes";
import moment from "moment";

import Card from "../../Components/Card/Card";
import ImageSlide from "../../Components/ImageSlide/ImageSlide";
import ReviewBox from "../../Components/ReviewComponents/ReviewBox";
import NewReview from "../../Components/ReviewComponents/NewReview";

import "./Game.css";

import { useGetGameQuery } from "../../Api/gameEndpoints";

function Game(props) {
  const route = useParams();
  const { data, isError, isLoading, error } = useGetGameQuery(route.short_title);

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
          <div className="col-4">
            <img
              className="cover-img"
              src={data.cover_image}
              alt={data.short_title}
            ></img>
          </div>
          <div className="col-4">
            <h2>{data.title}</h2>

            <h4>
              Developer:{" "}
              {/* <NavLink to={nav_routes.PROFILE_DEV + data.developer_short}>
                {data.developer}
              </NavLink> */}
            </h4>
            <h4>Release Date: {moment(data.release_date).format("MMMM DD, YYYY")}</h4>
            <h4>
              Genres:{" "}
              {data.genres.map(
                (genre) => genre + (data.genres.length <= 1 ? "" : ", ")
              )}
            </h4>
            <h4>No. of players: {data.player_count}</h4>
          </div>

          <div className="col-4">
            <h2>General Score: {data.score_general}</h2>
            <h4>Gameplay: {data.score_gameplay}</h4>
            <h4>Graphics: {data.score_graphics}</h4>
            <h4>Sound/Music: {data.score_sound}</h4>
            <h4>Narrative: {data.score_narrative}</h4>
          </div>

          <div className="col-12 synopsis-div">
            <h2>Synopsis:</h2>
            <p>{data.synopsis}</p>
          </div>

          <div className="col-12">
            <ImageSlide
              title="Gallery"
              type="gallery"
              array={data.gallery}
            />
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

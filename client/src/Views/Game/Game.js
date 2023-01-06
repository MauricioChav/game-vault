import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import Card from "../../Components/Card/Card";
import ImageSlide from "../../Components/ImageSlide/ImageSlide";
import ReviewBox from "../../Components/ReviewComponents/ReviewBox";
import NewReview from "../../Components/ReviewComponents/NewReview";

import "./Game.css";

import GameTableTest from "../../DB/GameTableTest";
import ReviewTableTest from "../../DB/ReviewTableTest";

function Game(props) {
  const route = useParams();
  const game_info = GameTableTest.find((o) => o.short_title === route.name);
  const game_reviews = ReviewTableTest.filter(
    (o) => o.game_id === game_info.id
  );

  //Reviews
  let reviewContent = <div></div>;

  if (game_reviews.length !== 0) {
    reviewContent = (
      <>
        {game_reviews.map((review) => (
          <ReviewBox review_info={review} />
        ))}

        <NavLink
          to={nav_routes.REVIEWS + game_info.short_title}
          className="btn btn-big"
        >
          See all reviews
        </NavLink>
      </>
    );
  } else {
    reviewContent = (
      <h5>
        Currently there are no reviews for this game. Be te first one to review
        it!
      </h5>
    );
  }

  console.log(reviewContent);

  return (
    <Card>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <img
              className="cover-img"
              src={game_info.cover_image}
              alt={game_info.short_title}
            ></img>
          </div>
          <div className="col-4">
            <h2>{game_info.title}</h2>

            <h4>
              Developer:{" "}
              <NavLink to={nav_routes.PROFILE_DEV + game_info.developer_short}>
                {game_info.developer}
              </NavLink>
            </h4>
            <h4>Release Date: {game_info.release_date}</h4>
            <h4>
              Genres:{" "}
              {game_info.genres.map(
                (genre) => genre + (game_info.genres.length <= 1 ? "" : ", ")
              )}
            </h4>
            <h4>No. of players: {game_info.player_count}</h4>
          </div>

          <div className="col-4">
            <h2>General Score: {game_info.score.average}</h2>
            <h4>Gameplay: {game_info.score.gameplay}</h4>
            <h4>Graphics: {game_info.score.graphics}</h4>
            <h4>Sound/Music: {game_info.score.sound}</h4>
            <h4>Narrative: {game_info.score.narrative}</h4>
          </div>

          <div className="col-12 synopsis-div">
            <h2>Synopsis:</h2>
            <p>{game_info.summary}</p>
          </div>

          <div className="col-12">
            <ImageSlide
              title="Gallery"
              type="gallery"
              array={game_info.gallery}
            />
          </div>

          <div className="col-12">
            <h2>Reviews:</h2>
            <NewReview />
            {reviewContent}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Game;

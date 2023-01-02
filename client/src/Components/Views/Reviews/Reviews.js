import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../../routes";

import Card from "../../Common/Card/Card";
import ReviewBox from "../../Common/ReviewComponents/ReviewBox";
import NewReview from "../../Common/ReviewComponents/NewReview";

import GameTableTest from "../../DB/GameTableTest";
import ReviewTableTest from "../../DB/ReviewTableTest";

function Reviews() {
  const route = useParams();
  const game_info = GameTableTest.find((o) => o.short_title === route.name);
  const game_reviews = ReviewTableTest.filter(
    (o) => o.game_id === game_info.id
  );

  return (
    <Card>
      <div className="row">
        <div className="col-9">
          <h1>{game_info.title} reviews</h1>
        </div>
        <div className="col-3">
          <NavLink
            to={nav_routes.GAME + game_info.short_title}
            className="btn btn-small"
          >
            Back to game page
          </NavLink>
        </div>
      </div>

      <NewReview />
      {game_reviews.length !== 0 ? (
        game_reviews.map((review) => <ReviewBox review_info={review} />)
      ) : (
        <h5>
          Currently there are no reviews for this game. Be te first one to
          review it!
        </h5>
      )}
    </Card>
  );
}

export default Reviews;

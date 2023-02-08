import React from "react";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";
import ReviewBox from "../../Components/ReviewComponents/ReviewBox";

import "./ReviewComponents.css";

import { useGetGameReviewsQuery } from "../../Api/reviewEndpoints";

function ReviewWall(props) {
  const {
    data: reviews,
    isError,
    isLoading,
    error,
  } = useGetGameReviewsQuery(props.game_id);

  if (isError) {
    console.log("Error fetching reviews", error);
  } else if (isLoading) {
    return (
      <div>
        <h1>Loading Reviews...</h1>
      </div>
    );
  }

  if (reviews.length > 0) {
    return (
      <>
        {reviews.map((review) => (
          <ReviewBox key={review._id} review_info={review} />
        ))}

        <NavLink
          to={nav_routes.REVIEWS + props.short_title}
          className="btn btn-classic btn-big"
        >
          See all reviews
        </NavLink>
      </>
    );
  } else {
    return (
      <h5>
        Currently there are no reviews for this game. Be te first one to review
        it!
      </h5>
    );
  }
}

export default ReviewWall;

import React from "react";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import ReviewList from "./ReviewList";
import ReviewUserBox from "./ReviewUserBox";

import "./ReviewComponents.css";

import { useGetGameReviewsQuery } from "../../Api/reviewEndpoints";

function ReviewManager(props) {
  //Review Manager Content
  let reviewList = <div></div>;
  let userReview = <div></div>;
  let showAllReviewsButton = <div></div>;

  //Validating user Login and user type
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  let userType = -1;

  //Set ReviewerUserBox for loggedIn Reviewers
  if (loggedUser !== null) {
    userType = loggedUser.user.user_type;
    if (userType === 0) {
      userReview = <ReviewUserBox game_id={props.game_id} />;
    }
  }

  if (!loggedUser) {
    userReview = (
      <NavLink
        to={nav_routes.LOGIN}
        className="btn btn-primary btn-big fg-space"
      >
        Login to create a review
      </NavLink>
    );
  }

  //Getting the ReviewList
  const {
    data: reviews,
    isError,
    isLoading,
    error,
  } = useGetGameReviewsQuery(props.game_id);

  if (isError) {
    console.log("Error fetching reviews", error);
  } else if (isLoading) {
    reviewList = <div>Loading Reviews...</div>;
  } else {
    //Exclude the review from the loggedIn reviewer in the ReviewList
    let modReviews = reviews;
    if (loggedUser) {
      modReviews = reviews.filter((review) => {
        return review.reviewer_id._id !== loggedUser.user._id;
      });
    }

    //Show the Review List only if there is at least 1 element on the full list
    if (reviews.length > 0) {
      reviewList = (
        <>
          <ReviewList reviews={modReviews} short_title={props.short_title} />
        </>
      );
      showAllReviewsButton = (
        <NavLink
          to={nav_routes.REVIEWS + props.short_title}
          className="btn btn-classic btn-big"
        >
          See all reviews
        </NavLink>
      );
    } else {
      reviewList = (
        <h5>
          Currently there are no reviews for this game. Be te first one to
          review it!
        </h5>
      );
    }
  }

  return (
    <>
      {userReview}
      {reviewList}
      {props.allReviewsButton && showAllReviewsButton}
    </>
  );
}

export default ReviewManager;

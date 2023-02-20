import React from "react";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import ReviewBox from "./ReviewBox";
import ValidateReview from "./ValidateReview";

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
      userReview = <ValidateReview game_id={props.game_id} profile="user"/>;
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
    //With profile prop, the Review List is going to show the user info at the top of every ReviewBox
    if (reviews.length > 0) {
      reviewList = modReviews.map((review) => (
        <ReviewBox key={review._id} review_info={review} profile="user" readOnly />
      ));
      showAllReviewsButton = (
        <NavLink
          to={nav_routes.REVIEWS + props.short_title}
          className="btn btn-classic btn-big"
        >
          See all reviews
        </NavLink>
      );
    } else {
      if (userType !== 1) {
        reviewList = (
          <h5>
            Currently there are no reviews for this game. Be te first one to
            review it!
          </h5>
        );
      } else {
        reviewList = <h5>Currently there are no reviews for this game.</h5>;
      }
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

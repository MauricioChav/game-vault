import React from "react";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import ReviewBox from "./ReviewBox";
import ReviewEditableBox from "./ReviewEditableBox";
import "./ReviewComponents.css";

import { useGetUserReviewsQuery } from "../../Api/reviewEndpoints";

function ReviewUserManager(props) {
  //Review Manager Content
  let reviewList = <div></div>;
  let showAllReviewsButton = <div></div>;

  //Validating user Login and user type
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  let userID = -1;

  //Set ReviewerUserBox for loggedIn Reviewers
  if (loggedUser !== null) {
    userID = loggedUser.user._id;
  }

  //Getting the ReviewList
  const {
    data: reviews,
    isError,
    isLoading,
    error,
  } = useGetUserReviewsQuery(props.user_name);

  if (isError) {
    console.log("Error fetching reviews", error);
  } else if (isLoading) {
    reviewList = <div>Loading Reviews...</div>;
  } else {
    //Show the Review List only if there is at least 1 element on the full list
    if (reviews.length > 0) {
      if (userID === reviews[0].reviewer_id) {
        reviewList = reviews.map((review) => (
          <ReviewEditableBox
            key={review._id}
            review_info={review}
            profile="game"
          />
        ));
      } else {
        reviewList = reviews.map((review) => (
          <ReviewBox key={review._id} review_info={review} profile="game" readOnly />
        ));
      }

      showAllReviewsButton = (
        <NavLink
          to={nav_routes.PROFILE_REVIEWER + props.user_name + "/reviews"}
          className="btn btn-classic"
        >
          All Reviews from {props.user_name}
        </NavLink>
      );
    } else {
      reviewList = <h5>Currently this user has not made any reviews.</h5>;
    }
  }

  console.log(reviews);

  return (
    <>
      {reviewList}
      {props.allReviewsButton && showAllReviewsButton}
    </>
  );
}

export default ReviewUserManager;

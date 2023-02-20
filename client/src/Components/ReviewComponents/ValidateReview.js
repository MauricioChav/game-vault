import React, { useState } from "react";

import ReviewForm from "./ReviewForm";
import ReviewEditableBox from "./ReviewEditableBox";

import "./ReviewComponents.css";

import { useVerifyReviewQuery } from "../../Api/reviewEndpoints";

function ValidateReview(props) {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const {
    data: review,
    isError,
    isLoading,
    error,
  } = useVerifyReviewQuery({
    game_id: props.game_id,
    token: loggedUser.token,
  });

  if (isError) {
    return console.log("Error", error);
  } else if (isLoading) {
    return;
  }

  //Show ReviewBox
  if (review) {
    return <ReviewEditableBox review_info={review} profile="user" />;
  } else {
    //Show NewReview Form
    return <ReviewForm game_id={props.game_id} />;
  }
}

export default ValidateReview;

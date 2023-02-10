import React, { useEffect } from "react";

import NewReview from "./ReviewForm";
import ReviewBox from "./ReviewBox";

import "./ReviewComponents.css";

import { useVerifyReviewQuery } from "../../Api/reviewEndpoints";

function ReviewUserBox(props) {
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

  //Review Verify Fetched

  //Show ReviewBox
  if (review) {
    return (
      <>
        <ReviewBox key={review._id} review_info={review} />
        <NewReview game_id={props.game_id} game_edit={review}/>
      </>
    );
  } else {
    //Show NewReview Form
    return <NewReview game_id={props.game_id} />;
  }
}

export default ReviewUserBox;

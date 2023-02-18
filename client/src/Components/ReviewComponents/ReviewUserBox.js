import React, { useState } from "react";

import ReviewForm from "./ReviewForm";
import ReviewBox from "./ReviewBox";

import "./ReviewComponents.css";

import { useVerifyReviewQuery } from "../../Api/reviewEndpoints";

function ReviewUserBox(props) {
  const [showEditor, setShowEditor] = useState(false);
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
  const changeEditorHandler = () => {
    setShowEditor(!showEditor);
  };

  //Show ReviewBox
  if (review) {
    return (
      <>
        {showEditor ? (
          <ReviewForm game_id={props.game_id} game_edit={review} onChangeEditor={changeEditorHandler}/>
        ) : (
          <ReviewBox key={review._id} review_info={review} readOnly={false} profile={props.profile} onChangeEditor={changeEditorHandler}/>
        )}
      </>
    );
  } else {
    //Show NewReview Form
    return <ReviewForm game_id={props.game_id} />;
  }
}

export default ReviewUserBox;

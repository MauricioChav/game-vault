import React, { useState } from "react";

import ReviewForm from "./ReviewForm";
import ReviewBox from "./ReviewBox";

import "./ReviewComponents.css";

function ReviewUserProfileBox(props) {
  const [showEditor, setShowEditor] = useState(false);
  const review = props.review_info;

  //Review Verify Fetched
  const changeEditorHandler = () => {
    setShowEditor(!showEditor);
  };

  //Show ReviewBox

  return (
    <>
      {showEditor ? (
        <ReviewForm
          game_id={review.game_id}
          game_edit={review}
          onChangeEditor={changeEditorHandler}
        />
      ) : (
        <ReviewBox
          key={review._id}
          review_info={review}
          readOnly={false}
          profile={props.profile}
          onChangeEditor={changeEditorHandler}
        />
      )}
    </>
  );
}

export default ReviewUserProfileBox;

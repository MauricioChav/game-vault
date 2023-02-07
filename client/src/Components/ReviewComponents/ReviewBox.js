import React from "react";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

import "./ReviewComponents.css";

function ReviewBox(props) {
  let recommendedMessage = "";

  const average_score = props.review_info.score_general;
  switch (true) {
    case average_score >= 7:
      recommendedMessage = "Recommended";
      break;

    case average_score < 7 && average_score >= 5:
      recommendedMessage = "Mixed Feelings";
      break;

    case average_score < 5:
      recommendedMessage = "Not Recommended";
      break;

    default:
      recommendedMessage = "";
      break;
  }

  return (
    <div className="mainBox">
      <div className="short-description row">
        <div className="col-6">
          <ProfilePicture
            img={props.review_info.reviewer_id.img_profile}
            img_title={props.review_info.reviewer_id.user_name + "_profile_pic"}
          />
          <h4 className="user-title">
            {props.review_info.reviewer_id.user_name}
          </h4>
        </div>
        <div className="col-6 text-right">
          <h5>Average Score: {props.review_info.score_general}</h5>
          <h6>{recommendedMessage}</h6>
        </div>
      </div>
      <p className="review-body">{props.review_info.review_body}</p>

      <div>
        <h5>Score: {props.review_info.score_general}</h5>
        <h6>Gameplay: {props.review_info.score_gameplay}</h6>
        <h6>Graphics: {props.review_info.score_graphics}</h6>
        <h6>Sound/Music: {props.review_info.score_sound}</h6>
        <h6>Narrative: {props.review_info.score_narrative}</h6>
      </div>
    </div>
  );
}

export default ReviewBox;

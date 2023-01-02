import React from "react";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

import "./ReviewComponents.css";

function ReviewBox(props) {

  let recommendedMessage = "Recommended";

  return (
    <div className="mainBox">
      <div className="short-description row">
        <div className="col-6">
          <ProfilePicture
            img={props.review_info.user_profile_picture}
            img_title={props.review_info.user_name + "_profile_pic"}
          />
          <h4 className="user-title">{props.review_info.user_name}</h4>
        </div>
        <div className="col-6 text-right">
          <h5>Average Rating: {props.review_info.rating.average}</h5>
          <h6>{recommendedMessage}</h6>
        </div>
      </div>
      <p className="review-body">{props.review_info.review_body}</p>

      <div>
            <h5>Rating: {props.review_info.rating.average}</h5>
            <h6>Gameplay: {props.review_info.rating.gameplay}</h6>
            <h6>Graphics: {props.review_info.rating.graphics}</h6>
            <h6>Sound/Music: {props.review_info.rating.sound}</h6>
            <h6>Narrative: {props.review_info.rating.narrative}</h6>
          </div>
    </div>
  );
}

export default ReviewBox;

import React from "react";
import ReviewBox from "./ReviewBox";

import "./ReviewComponents.css";

function ReviewList(props) {
  const reviews = props.reviews;
  const profile = props.profile;

  // console.log(profile);

  return (
    <>
      {reviews.map((review) => (
        <ReviewBox key={review._id} review_info={review} profile={profile} readOnly />
      ))}
    </>
  );
}

export default ReviewList;

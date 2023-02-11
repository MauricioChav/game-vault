import React from "react";
import ReviewBox from "./ReviewBox";

import "./ReviewComponents.css";

function ReviewList(props) {
  const reviews = props.reviews;

  return (
    <>
      {reviews.map((review) => (
        <ReviewBox key={review._id} review_info={review} readOnly />
      ))}
    </>
  );
}

export default ReviewList;

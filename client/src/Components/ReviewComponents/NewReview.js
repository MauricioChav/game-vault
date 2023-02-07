import React, { useState } from "react";

import ScoreSelector from "./ScoreSelector";

import "./ReviewComponents.css";

import { useCreateReviewMutation } from "../../Api/reviewEndpoints";

function NewReview(props) {
  const [reviewModal, setReviewModal] = useState(0);

  //Submit review
  const reviewHandler = async (event) => {
    event.preventDefault();

    //Asign data
    const review_body = event.target.elements.review_body.value;
    console.log({
      review_body,
    });
  };

  //Modal Functions
  const reviewModalHandler = (mode) => {
    setReviewModal(mode);
  };

  if (reviewModal === 0) {
    return (
      <div>
        <button
          className="new-review-button"
          onClick={() => reviewModalHandler(1)}
        >
          Write a review
        </button>
      </div>
    );
  } else {
    return (
      <form className="review-form" onSubmit={reviewHandler}>
        <h3 className="form-title">New review</h3>
        <textarea
          className="review-textarea"
          type="text"
          id="review_body"
          name="review_body"
        ></textarea>

        <div className="score-selectors">
          <label>General Score: </label>
          <ScoreSelector field="score_general" />

          <label>Gameplay: </label>
          <ScoreSelector field="score_gameplay" />

          <label>Graphics: </label>
          <ScoreSelector field="score_graphics" />

          <label>Sound/Music: </label>
          <ScoreSelector field="score_sound" />

          <label>Narrative: </label>
          <ScoreSelector field="score_narrative" />
        </div>

        <div>
          <button
            className="btn btn-small btn-danger"
            onClick={() => reviewModalHandler(0)}
          >
            Cancel
          </button>

          <button className="btn btn-small btn-success" type="submit">
            Post review
          </button>
        </div>
      </form>
    );
  }
}

export default NewReview;

import React, { useState } from "react";

import ScoreSelector from "./ScoreSelector";

import "./ReviewComponents.css";

function NewReview(props) {
  const [reviewModal, setReviewModal] = useState(0);

  const reviewModalHandler = (mode) => {
    setReviewModal(mode);
  };

  if (reviewModal === 0) {
    return (
      <div>
        <button className="new-review-button" onClick={() => reviewModalHandler(1)}>
          Write a review
        </button>
      </div>
    );
  } else {
    return (
      <form className="review-form">
        <h3 className="form-title">New review</h3>
        <textarea
          className="review-textarea"
          type="text"
          id="review_body"
          name="review_body"
        ></textarea>

        <div className="score-selectors">
          <label>General Score: </label>
          <ScoreSelector field="score_average" />

          <label>Gameplay: </label>
          <ScoreSelector field="score_average" />

          <label>Graphics: </label>
          <ScoreSelector field="score_average" />

          <label>Sound/Music: </label>
          <ScoreSelector field="score_average" />

          <label>Narrative: </label>
          <ScoreSelector field="score_average" />
        </div>

        <div>
          <button className="btn btn-small btn-danger" onClick={() => reviewModalHandler(0)}>
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

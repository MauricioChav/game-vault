import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationCard, {
  NotificationMessage,
} from "../NotificationCard/NotificationCard";
import { Rating } from "@mui/material";

import "./ReviewComponents.css";

import { useCreateReviewMutation } from "../../Api/reviewEndpoints";

function NewReview(props) {
  console.log(props.game_id);
  const navigate = useNavigate();
  const [createReview] = useCreateReviewMutation();
  const [alert, setAlert] = useState({});
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  //Score rating values
  const [score_general, setScore_general] = useState(1);
  const [score_gameplay, setScore_gameplay] = useState(1);
  const [score_graphics, setScore_graphics] = useState(1);
  const [score_sound, setScore_sound] = useState(1);
  const [score_narrative, setScore_narrative] = useState(1);

  //Submit review
  const reviewHandler = async (event) => {
    event.preventDefault();

    //Asign data. Scores are contained in their states
    const review_body = event.target.elements.review_body.value;
    const recommendation = event.target.elements.recommendation.value;
    const spoilers = event.target.elements.spoilers.checked;

    //Create new review
    try {
      await createReview({
        game_id: props.game_id,
        data: {
          review_body,
          recommendation,
          spoilers,
          score_general,
          score_gameplay,
          score_graphics,
          score_sound,
          score_narrative,
        },
        token: loggedUser.token,
      }).unwrap();

      //Refresh the page
      navigate(0);
    } catch (e) {
      if (e.hasOwnProperty("data.message")) {
        setAlert(NotificationMessage("error", e.data.message));
      } else {
        setAlert(
          NotificationMessage("error", "Error. Review Creation failed!")
        );
      }
    }
  };

  return (
    <form className="review-form" onSubmit={reviewHandler}>
      <h3 className="form-title">New review</h3>
      <NotificationCard notification={alert} />
      <textarea
        className="review-textarea"
        type="text"
        rows={8}
        maxLength={500}
        required
        id="review_body"
        name="review_body"
      ></textarea>

      <div className="row score-space">
        <div className="col-12">
          <h5>Score</h5>
        </div>
        <div className="col-6">
          <table className="review-score-table">
            <tbody>
              <tr>
                <td>
                  <label>General Score: </label>
                </td>
                <td>
                  <Rating
                    name="score_general"
                    max={5}
                    precision={0.5}
                    value={score_general}
                    onChange={(event, newValue) => {
                      setScore_general(newValue);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Gameplay: </label>
                </td>
                <td>
                  <Rating
                    name="score_gameplay"
                    max={5}
                    precision={0.5}
                    value={score_gameplay}
                    onChange={(event, newValue) => {
                      setScore_gameplay(newValue);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Graphics: </label>
                </td>
                <td>
                  <Rating
                    name="score_graphics"
                    max={5}
                    precision={0.5}
                    value={score_graphics}
                    onChange={(event, newValue) => {
                      setScore_graphics(newValue);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Sound/Music: </label>
                </td>
                <td>
                  <Rating
                    name="score_sound"
                    max={5}
                    precision={0.5}
                    value={score_sound}
                    onChange={(event, newValue) => {
                      setScore_sound(newValue);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Narrative: </label>
                </td>
                <td>
                  <Rating
                    name="score_narrative"
                    max={5}
                    precision={0.5}
                    value={score_narrative}
                    onChange={(event, newValue) => {
                      setScore_narrative(newValue);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <div>
            <label>Do you recommend this game? </label>
            <br></br>
            <select id="recommendation" name="recommendation">
              <option value={0}>Recommended</option>
              <option value={1}>Mixed Feelings</option>
              <option value={2}>Not Recommended</option>
            </select>
          </div>

          <div className="score-space">
            <label>Contains Spoilers? </label>
            <br></br>
            <input
              className="i-checkbox"
              type="checkbox"
              id="spoilers"
              name="spoilers"
            ></input>
            <label htmlFor="spoilers">Yes</label>
          </div>
        </div>
      </div>

      <div>
        <button className="btn btn-small btn-success" type="submit">
          Post review
        </button>
      </div>
    </form>
  );
}

export default NewReview;

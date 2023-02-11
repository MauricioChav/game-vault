import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationCard, {
  NotificationMessage,
} from "../NotificationCard/NotificationCard";
import { Rating } from "@mui/material";

import "./ReviewComponents.css";

import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "../../Api/reviewEndpoints";

function EditReview(props) {
  const navigate = useNavigate();
  const [createReview] = useCreateReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [alert, setAlert] = useState({});
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  //Score rating values
  const [score_general, setScore_general] = useState(1);
  const [score_gameplay, setScore_gameplay] = useState(1);
  const [score_graphics, setScore_graphics] = useState(1);
  const [score_sound, setScore_sound] = useState(1);
  const [score_narrative, setScore_narrative] = useState(1);

  //Get Review Data if it is an edit
  let isEdit = false;
  let review_data = {};

  if (props.game_edit) {
    review_data = props.game_edit;
    isEdit = true;
  }

  //Set the scores if it is an edit
  useEffect(() => {
    if (isEdit) {
      setScore_general(review_data.score_general);
      setScore_gameplay(review_data.score_gameplay);
      setScore_graphics(review_data.score_graphics);
      setScore_sound(review_data.score_sound);
      setScore_narrative(review_data.score_narrative);
    }
  }, [isEdit, review_data.score_general, review_data.score_gameplay, review_data.score_graphics, review_data.score_sound, review_data.score_narrative]);

  //Submit review
  const reviewHandler = async (event) => {
    event.preventDefault();

    //Asign data. Scores are contained in their states
    const review_body = event.target.elements.review_body.value;
    const recommendation = event.target.elements.recommendation.value;
    const spoilers = event.target.elements.spoilers.checked;

    //Verify that none of the scores is empty
    if (
      score_general === null ||
      score_gameplay === null ||
      score_graphics === null ||
      score_sound === null ||
      score_narrative === null
    ) {
      return setAlert(
        NotificationMessage("error", "A score rating can't be empty")
      );
    }

    //Create new review
    if (!isEdit) {
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
    } else {
      //Edit existing review
      try {
        await updateReview({
          id: review_data._id,
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
          setAlert(NotificationMessage("error", "Error. Review Edit failed!"));
        }
      }
    }
  };

  return (
    <form className="review-form" onSubmit={reviewHandler}>
      <h3 className="form-title">{isEdit ? "Edit Review" : "New review"}</h3>
      <NotificationCard notification={alert} />
      <textarea
        className="review-textarea"
        type="text"
        rows={8}
        maxLength={500}
        required
        id="review_body"
        name="review_body"
        defaultValue={isEdit ? review_data.review_body : ""}
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
            <select
              id="recommendation"
              name="recommendation"
              defaultValue={isEdit && review_data.recommendation}
            >
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
              defaultChecked={isEdit && review_data.spoilers}
            ></input>
            <label htmlFor="spoilers">Yes</label>
          </div>
        </div>
      </div>

      <div>
        {isEdit && <button className="btn btn-small btn-danger" type="button" onClick={props.onChangeEditor}>Cancel</button>}
        <button className="btn btn-small btn-success" type="submit">
          {isEdit ? "Update Review" : "Post review"}
        </button>
      </div>
    </form>
  );
}

export default EditReview;

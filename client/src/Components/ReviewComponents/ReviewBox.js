import React from "react";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

import "./ReviewComponents.css";

import moment from "moment";

function ReviewBox(props) {
  let recommendedMessage = <h6>Recommended</h6>;

  const recommendation = props.review_info.recommendation;
  switch (recommendation) {
    case 0:
      recommendedMessage = (
        <h6 className="badge badge-light-success" style={{ fontSize: "18px" }}>
          <i className="fa-solid fa-star"></i> Recommended
        </h6>
      );
      break;

    case 1:
      recommendedMessage = (
        <h6 className="badge badge-light-secondary">
          <i className="fa-regular fa-star-half-stroke"></i> Mixed Feelings
        </h6>
      );
      break;

    case 2:
      recommendedMessage = (
        <h6 className="badge badge-light-danger">
          <i className="fa-regular fa-star"></i> Not Recommended
        </h6>
      );
      break;

    default:
      recommendedMessage = <h6>Recommended</h6>;
      break;
  }

  return (
    <div className="mainBox">
      <div className="row">
        <div className="short-description col-9">
          <NavLink
            to={
              nav_routes.PROFILE_REVIEWER +
              props.review_info.reviewer_id.user_name
            }
          >
            <ProfilePicture
              img={props.review_info.reviewer_id.img_profile}
              img_title={
                props.review_info.reviewer_id.user_name + "_profile_pic"
              }
            />
          </NavLink>
          <NavLink
            to={
              nav_routes.PROFILE_REVIEWER +
              props.review_info.reviewer_id.user_name
            }
          >
            <h4 className="user-title">
              {props.review_info.reviewer_id.user_name}
            </h4>{" "}
          </NavLink>
          <h6>{moment(props.review_info.createdAt).format("MMMM DD, YYYY")}</h6>
          <br></br>
          {recommendedMessage}
          <br></br>
          {props.review_info.spoilers && (
            <h6 className="badge badge-danger">Contains Spoilers</h6>
          )}
        </div>
        <div className="col-3">
          <div>
            <table className="review-score-table">
              <tbody>
                <tr>
                  <td>
                    <h5 style={{ textAlign: "left" }}>General Score:</h5>
                  </td>
                  <td>
                    <h5 style={{ textAlign: "right" }}>
                      {props.review_info.score_general}
                    </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6 style={{ textAlign: "left" }}>Gameplay:</h6>
                  </td>
                  <td>
                    <h6 style={{ textAlign: "right" }}>
                      {props.review_info.score_gameplay}
                    </h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6 style={{ textAlign: "left" }}>Graphics:</h6>
                  </td>
                  <td>
                    <h6 style={{ textAlign: "right" }}>
                      {props.review_info.score_graphics}
                    </h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6 style={{ textAlign: "left" }}>Sound/Music:</h6>
                  </td>
                  <td>
                    <h6 style={{ textAlign: "right" }}>
                      {props.review_info.score_sound}
                    </h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6 style={{ textAlign: "left" }}>Narrative:</h6>
                  </td>
                  <td>
                    <h6 style={{ textAlign: "right" }}>
                      {props.review_info.score_narrative}
                    </h6>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="review-body">{props.review_info.review_body}</p>
    </div>
  );
}

export default ReviewBox;

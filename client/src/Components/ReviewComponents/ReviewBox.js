import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { nav_routes } from "../../routes";
import NotificationCard, {
  NotificationMessage,
} from "../NotificationCard/NotificationCard";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

import "./ReviewComponents.css";

import { useDeleteReviewMutation } from "../../Api/reviewEndpoints";

import moment from "moment";
import { Menu, MenuItem, IconButton, Rating } from "@mui/material";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

function ReviewBox(props) {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [deleteReview] = useDeleteReviewMutation();
  const [alert, setAlert] = useState({});

  const popupState = usePopupState({ variant: "popover", popupId: "editMenu" });
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
        <h6
          className="badge badge-light-secondary"
          style={{ fontSize: "18px" }}
        >
          <i className="fa-regular fa-star-half-stroke"></i> Mixed Feelings
        </h6>
      );
      break;

    case 2:
      recommendedMessage = (
        <h6 className="badge badge-light-danger" style={{ fontSize: "18px" }}>
          <i className="fa-regular fa-star"></i> Not Recommended
        </h6>
      );
      break;

    default:
      recommendedMessage = <h6>Recommended</h6>;
      break;
  }

  const editReviewHandler = () => {
    popupState.close();
    props.onChangeEditor();
  };

  const deleteReviewHandler = async () => {
    popupState.close();

    try {
      await deleteReview({
        id: props.review_info._id,
        token: loggedUser.token,
      }).unwrap();

      //Refresh the page
      navigate(0);
    } catch (e) {
      if (e.hasOwnProperty("data.message")) {
        setAlert(NotificationMessage("error", e.data.message));
      } else {
        setAlert(NotificationMessage("error", "Error. Review Delete failed!"));
      }
    }
  };

  return (
    <div className="mainBox">
      <div className="row">
        <div className="col-12">
          <NotificationCard notification={alert} />
        </div>
        <div
          className={
            props.readOnly
              ? "short-description col-12"
              : "short-description col-8"
          }
        >
          <NavLink
            to={
              nav_routes.PROFILE_REVIEWER +
              props.review_info.reviewer_id.user_name
            }
          >
            <ProfilePicture
              img={
                props.review_info.reviewer_id.img_profile !== "" 
                  ? props.review_info.reviewer_id.img_profile
                  : "https://le-cdn.hibuwebsites.com/a1921b266e5f44738a779d63a0fb5fa0/dms3rep/multi/opt/cherished-memories-photography--bio-640w.png"
              }
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
            </h4>
          </NavLink>
        </div>

        {!props.readOnly && (
          <div className="col-4" style={{ textAlign: "right" }}>
            <IconButton variant="contained" {...bindTrigger(popupState)}>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </IconButton>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={editReviewHandler}>
                <i className="fa-solid fa-pen-to-square"></i> Edit Review
              </MenuItem>
              <MenuItem onClick={deleteReviewHandler}>
                <i className="fa-solid fa-trash"></i>Delete Review
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>

      <div className="row">
        <div className="col-8">
          <h6>{moment(props.review_info.createdAt).format("MMMM DD, YYYY")}</h6>
          {recommendedMessage}
          <br></br>
          {props.review_info.spoilers && (
            <h6 className="badge badge-danger">Contains Spoilers</h6>
          )}
        </div>

        <div className="col-4">
          <table className="review-score-table">
            <tbody>
              <tr>
                <td>
                  <h5 style={{ textAlign: "left" }}>General Score:</h5>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Rating
                    name="score_general"
                    precision={0.5}
                    value={props.review_info.score_general}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h6 style={{ textAlign: "left" }}>Gameplay:</h6>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Rating
                    name="score_general"
                    precision={0.5}
                    value={props.review_info.score_gameplay}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h6 style={{ textAlign: "left" }}>Graphics:</h6>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Rating
                    name="score_general"
                    precision={0.5}
                    value={props.review_info.score_graphics}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h6 style={{ textAlign: "left" }}>Sound/Music:</h6>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Rating
                    name="score_general"
                    precision={0.5}
                    value={props.review_info.score_sound}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <h6 style={{ textAlign: "left" }}>Narrative:</h6>
                </td>
                <td style={{ textAlign: "right" }}>
                  <Rating
                    name="score_general"
                    precision={0.5}
                    value={props.review_info.score_narrative}
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="review-body">{props.review_info.review_body}</p>
    </div>
  );
}

export default ReviewBox;

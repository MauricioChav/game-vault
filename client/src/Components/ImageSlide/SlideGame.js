import React from "react";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import "./ImageSlide.css";

import { Rating } from "@mui/material";

function SlideGame(props) {
  return (
    <div className="col-2">
    <NavLink to={nav_routes.GAME + props.info.short_title}>
      <div className="slide_element">
        <img
          src={props.info.cover_image === "" || props.info.cover_image === undefined ? "https://vglist.co/packs/media/images/no-cover-369ad8f0ea82dde5923c942ba1a26482.png": props.info.cover_image}
          alt={props.info.short_title}
        ></img>
        <h3>{props.info.title}</h3>
        <Rating
          name="score_general"
          precision={0.1}
          value={props.info.scores.score_general}
          size="large"
          readOnly
        />
      </div>
    </NavLink>
    </div>
  );
}

export default SlideGame;

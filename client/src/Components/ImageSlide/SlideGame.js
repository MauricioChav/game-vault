import React from "react";
import { NavLink } from "react-router-dom";
import { nav_routes } from "../../routes";

import "./ImageSlide.css";

function SlideGame(props) {
  return (
    <div className="col-2">
    <NavLink to={nav_routes.GAME + props.info.short_title}>
      <div className="slide_element">
        <img
          src={props.info.cover_image}
          alt={props.info.short_title}
        ></img>
        <h3>{props.info.title}</h3>
        <p>Score: {props.info.score_general}</p>
      </div>
    </NavLink>
    </div>
  );
}

export default SlideGame;

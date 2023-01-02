import React from "react";
import SlideGame from "./SlideGame";
import SlideGallery from "./SlideGallery";

import "./ImageSlide.css";

function ImageSlide(props) {
  return (
    <div className="slide">
      <h1>{props.title}</h1>
      <div className="row">
        {props.type === "game" &&
          props.array.map((slide_element) => (
            <SlideGame info={slide_element} />
          ))}

        {props.type === "gallery" &&
          props.array.map((slide_element) => (
            <SlideGallery info={slide_element} />
          ))}
      </div>
    </div>
  );
}

export default ImageSlide;

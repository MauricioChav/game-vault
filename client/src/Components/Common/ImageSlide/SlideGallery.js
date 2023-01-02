import React from "react";

import "./ImageSlide.css";

function SlideGallery(props) {
  return (
    <div className="col-4">
      <div className="slide_element">
        <img
          src={props.info}
          alt=""
        ></img>
      </div>
    </div>
  );
}

export default SlideGallery;

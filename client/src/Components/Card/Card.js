import React from "react";

import "./Card.css";

function Card(props) {
  let custom_width = '95%';

  /*Sugested widths:
  Small - 380px
  Big - 95%
  */

  if(props.width !== undefined){
    custom_width = props.width;
  }

  return (
    <div className={"card_container " + (props.className !== undefined ? props.className : "")}  style={{width: custom_width}}>
      {props.children}
    </div>
  );
}

export default Card;

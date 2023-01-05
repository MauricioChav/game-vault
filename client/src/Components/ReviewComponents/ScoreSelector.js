import React from "react";

import './ReviewComponents.css'

function ScoreSelector(props) {
  return (
    <select id={props.field} className={"selector"}>
      <option value={0}>0</option>
      <option value={0.5}>0.5</option>
      <option value={1}>1</option>
      <option value={1.5}>1.5</option>
      <option value={2}>2</option>
      <option value={2.5}>2.5</option>
      <option value={3}>3</option>
      <option value={3.5}>3.5</option>
      <option value={4}>4</option>
      <option value={4.5}>4.5</option>
      <option value={5}>5</option>
    </select>
  );
}

export default ScoreSelector;

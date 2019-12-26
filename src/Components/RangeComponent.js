import React from "react";
import {
  Range,
  RangeTextBox,
  RangeText
} from "../Style.js";

function RangeComponent(props) {

  const {
    changeValue,
    distance,
  } = props;

  return (
    <>
      <Range onChange={event => changeValue(event.target.value)} />
      <RangeTextBox value={distance} />
      <RangeText>Km</RangeText>
    </>
  );
}

export default RangeComponent;

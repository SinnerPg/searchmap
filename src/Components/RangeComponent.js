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
    setDistance
  } = props;

  return (
    <>
      <Range value={distance*1000} onChange={event => changeValue(event.target.value)} />
      <RangeTextBox value={distance} onChange={e => setDistance(e.target.value)} />
      <RangeText>Km</RangeText>
    </>
  );
}

export default RangeComponent;

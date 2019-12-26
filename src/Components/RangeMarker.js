import React from "react";
import { RangeCircle } from "../Style.js";

function RangerMarker(props) {
  const { width, height } = props;
  return <RangeCircle style={{ width: width, height: height }}></RangeCircle>;
}

export default RangerMarker;

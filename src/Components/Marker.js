import React from "react";
import { GoogleMarker } from "../Style.js";

function Marker(props) {
  const { color } = props;
  return (
      <GoogleMarker style={{ backgroundColor: color, cursor: "pointer" }} />
  );
}

export default Marker;

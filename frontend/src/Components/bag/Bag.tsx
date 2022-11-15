import React, { useState } from "react";
import "./Bag.scss";

export default function Bag(props) {
  const [cursorPosition, setCursorPosition] = useState({
    top: props.top,
    left: props.left,
  });
  const onMouseMove = (e) =>
    setCursorPosition({ top: e.screenY, left: e.screenX });

  return (
    <div className="bag" onMouseMove={onMouseMove}>
      <div style={{ position: "absolute", ...cursorPosition }} />
    </div>
  );
}

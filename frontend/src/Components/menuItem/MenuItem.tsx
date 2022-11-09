import React from "react";
import "./MenuItem.scss";

export default function MenuItem(props) {
  return (
    <div className="menu-item-container">
      <div className={props.icon}></div>
      <h1>{props.text}</h1>
    </div>
  );
}

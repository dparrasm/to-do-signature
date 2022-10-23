import Button from "@material-ui/core/Button";
import React from "react";
import "./Column.scss";
import { icons } from "../../utils/icons";

export default function Column() {
  return (
    <div className="container">
      <ul className="column-list">
        <li>
          <Button className="start-button" variant="contained" color="primary">
            START
          </Button>
        </li>
        <li>Envelopes</li>
        <li>
          <div>
            <span className={icons.received}>Inbox</span>
          </div>
        </li>
        <li>Sent</li>
        <li>Draft</li>
        <li>Deleted</li>
      </ul>
    </div>
  );
}

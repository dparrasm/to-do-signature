import React from "react";
import "./Column.scss";
import { icons } from "../../utils/icons";
import { Link } from "react-router-dom";

export default function Column() {
  return (
    <div className="container">
      <div className="column-list">
        <div>
          <Link to="/prepare">
            <button className="column-start-to-prepare-envelope-button">START</button>
          </Link>
        </div>
        <div className="envelopes">
          <h4>Envelopes</h4>
          <div className="column-menu-option">
            <div className={icons.received}></div>
            <div>Inbox</div>
          </div>
          <div className="column-menu-option">
            <div className={icons.send}></div>
            <div>Sent</div>
          </div>
          <div className="column-menu-option">
            <div className={icons.documents}></div>
            <div>Draft</div>
          </div>
          <div className="column-menu-option">
            <div className={icons.trashcan}></div>
            <div>Deleted</div>
          </div>
        </div>
      </div>
    </div>
  );
}

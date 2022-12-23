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
            <button className="column-start-to-prepare-envelope-button">
              START
            </button>
          </Link>
        </div>
        <div className="envelopes">
          <h4>Envelopes</h4>
          <Link className="column-menu-option" to="/manage/inbox">
            <div className={icons.received}></div>
            <div>Inbox</div>
          </Link>
          <Link className="column-menu-option" to="/manage/sent">
            <div className={icons.send}></div>
            <div>Sent</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

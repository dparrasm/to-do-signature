import React from "react";
import "./Column.scss";
import { icons } from "../../utils/icons";
import Filepicker from "../searchBar/filepicker/Filepicker";

export default function Column() {
  return (
    <div className="container">
      <div className="column-list">
        <div>
          <Filepicker title="START" accept=".pdf" multiple={true} />
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

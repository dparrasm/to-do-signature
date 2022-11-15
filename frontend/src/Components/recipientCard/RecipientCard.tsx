import React from "react";
import "./RecipientCard.scss";

export default function RecipientCard(props) {
  return (
    <div id={props?.index} className="recipient-card-container">
      <div className="recipient-card-data">
        <div className="recipient-card-data-name">
          <div>
            <span>Name</span>
            <span className="star">*</span>
          </div>
          <input
            id={"name#" + props.index}
            type="text"
            onChange={(e) => props.updateRecipient(e)}
          />
        </div>
        <div className="recipient-card-data-name">
          <div>
            <span>Email</span>
            <span className="star">*</span>
          </div>
          <input
            id={"email#" + props.index}
            type="text"
            onChange={(e) => props.updateRecipient(e)}
          />
        </div>
      </div>
      <div className="recipient-card-buttons">
        <form className="recipient-card">
          <div className="custom-select">
            <select
              className="recipient-card-select"
              name="list"
              id={"needsTo#" + props.index}
              onChange={(e) => props.updateRecipient(e)}
            >
              <option>NEEDS TO SIGN</option>
              <option>NEEDS TO VIEW</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}

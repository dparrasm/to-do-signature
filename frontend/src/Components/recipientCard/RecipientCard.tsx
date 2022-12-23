import React from "react";
import "./RecipientCard.scss";

export default function RecipientCard(props) {
  return (
    <div>
      <div className="recipientcard-remove-button-container">
        <div>
          <button
            className="recipientcard-remove-button"
            onClick={() => props?.removeReceipt(props?.id)}
          >
            X
          </button>
        </div>
      </div>
      <div id={props?.id} className="recipient-card-container">
        <div className="recipient-card-data">
          <div className="recipient-card-data-name">
            <div>
              <span>Name</span>
              <span className="star">*</span>
            </div>
            <input
              id={"name#" + props?.id}
              type="text"
              onChange={(e) => props?.updateRecipient(e)}
              value={props.name}
            />
          </div>
          <div className="recipient-card-data-name">
            <div>
              <span>Email</span>
              <span className="star">*</span>
            </div>
            <input
              id={"email#" + props?.id}
              type="text"
              onChange={(e) => props?.updateRecipient(e)}
            />
          </div>
        </div>
        <div className="recipient-card-buttons">
          <form className="recipient-card">
            <div className="custom-select">
              <select
                className="recipient-card-select"
                name="list"
                id={"needsTo#" + props?.id}
                onChange={(e) => props?.updateRecipient(e)}
              >
                <option>NEEDS TO SIGN</option>
                <option>NEEDS TO VIEW</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { icons } from "../../utils/icons";
import "./RecipientCard.scss";

export default function RecipientCard(props) {
  return (
    <div>
      <div id={props?.id} className="recipient-card-container">
        <div className="recipient-card-container-avatar">
          <div className="recipient-card-container-avatar-img"></div>
        </div>
        <div className="recipient-card-data">
          <div className="recipient-card-data-name">
            <div className="recipient-card-data-text-container">
              <h1>Name</h1>
              <h1 className="star">*</h1>
            </div>
            <input
              id={"name#" + props?.id}
              type="text"
              onChange={(e) => props?.updateRecipient(e)}
              value={props.name}
            />
          </div>
          <div className="recipient-card-data-name">
            <div className="recipient-card-data-text-container">
              <h1>Email</h1>
              <h1 className="star">*</h1>
            </div>
            <input
              id={"email#" + props?.id}
              type="text"
              onChange={(e) => props?.updateRecipient(e)}
              value={props.email}
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
                value={props.needsTo}
              >
                <option value="SIGN">NEEDS TO SIGN</option>
                <option value="VIEW">NEEDS TO VIEW</option>
              </select>
            </div>
          </form>
        </div>
        <div className="recipientcard-remove-button-container">
          <div>
            <button
              className="recipientcard-remove-button"
              onClick={() => props?.removeReceipt(props?.id)}
            >
              <i className={icons.trashcan} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

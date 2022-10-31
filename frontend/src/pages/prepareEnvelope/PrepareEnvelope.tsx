import { Link } from "react-router-dom";
import React from "react";
import "./PrepareEnvelope.scss";
import { Button } from "@material-ui/core";
import Filepicker from "../../components/filepicker/Filepicker";

export default function PrepareEnvelope(props) {
  return (
    <div>
      <div className="close-bar">
        <Link className="cross-button" to="/manage">
          <button>X</button>
        </Link>
      </div>
      <div className="container-wrap">
        <div className="add-documents-container">
          <div className="prepare-envelope-titles">
            <h1>Add documents</h1>
          </div>
          <div className="drag-and-drop-container">
            <div className="prepare-drag-and-drop">
              <div className="fake">
                <Filepicker title="Upload" accept=".pdf" multiple={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="add-documents-container">
          <div className="prepare-envelope-titles">
            <h1>Add recipients</h1>
          </div>
          <div className="receipts-container">
            <input type="text"></input>
          </div>
        </div>
      </div>
      <div className="prepare-envelope-button-actions">
        <Button variant="contained" color="primary">
          Send
        </Button>
      </div>
    </div>
  );
}

import React from "react";
import { icons } from "../../utils/icons";
import Filepicker from "../filepicker/Filepicker";
import "./DragAndDrop.scss";

export default function DragAndDrop(props) {
  return (
    <div className="drag-and-drop">
      <div className="button-container">
        <div className="drag-and-drop-file-icon-container">
          <i className={icons.fileUpload}></i>
        </div>
        <Filepicker title={props.title} accept=".pdf" multiple={true} />
      </div>
    </div>
  );
}

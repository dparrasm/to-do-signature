import React from "react";
import { icons } from "../../utils/icons";
import Filepicker from "../filepicker/Filepicker";
import "./DragAndDrop.scss";

export default function DragAndDrop(props) {
  // triggers when file is dropped
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.textContent);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(JSON.stringify(e.dataTransfer.getData("text/plain")));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      console.log(JSON.stringify(e.dataTransfer.files));
    }
  };
  return (
    <div
      className="drag-and-drop"
      draggable
      onDragStart={handleDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="button-container">
        <div className="drag-and-drop-file-icon-container">
          <i className={icons.fileUpload}></i>
        </div>
        <Filepicker title={props.title} accept=".pdf" multiple={true} />
      </div>
    </div>
  );
}

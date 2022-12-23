import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import Progressbar from "../progressbar/Progressbar";
import "./Envelope.scss";
import IconButton from "../iconButton/IconButton";
import { icons } from "../../utils/icons";

export default function Envelope(props) {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = (e) => {
    if (!isChecked) {
      props.addChecked(e);
    } else {
      props.removeChecked(e);
    }
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="table">
        <div>
          {/* {documentsToSign?.map((d, index) => ( */}
          <div className="envelope-table-row">
            <div className="envelope-table-row-cell">
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value={props.index}
                checked={isChecked}
                onChange={handleOnChange}
              />
            </div>
            <div className="envelope-table-row-cell">
              <div className="document-info">
                <div className="document-title">{props.title}</div>
                <div className="document-subtitle">
                  Para: David Parras Martínez
                </div>
                <Avatar className="avatar">D</Avatar>
              </div>
            </div>
            <div className="envelope-table-row-cell">
              <div className="progressbar">
                <Progressbar />
              </div>
            </div>
            <div className="envelope-table-row-cell-date">
              <div>
                {new Date(props.lastChange).getDate()}/
                {new Date(props.lastChange).getMonth()}/
                {new Date(props.lastChange).getFullYear()}
              </div>
              <div className="document-subtitle">
                {new Date(props.lastChange).getHours()}:
                {new Date(props.lastChange).getMinutes()}
              </div>
            </div>
            <div className="envelope-table-row-cell">
              <div
                className="envelope-table-row-cell-iconbutton"
                onClick={() =>
                  props.handleClick({ id: props.id, action: "SIGN" })
                }
              >
                <IconButton icon={icons.pen} />
              </div>
              <div
                className="envelope-table-row-cell-iconbutton"
                onClick={() =>
                  props.handleClick({ id: props.id, action: "DELETE" })
                }
              >
                <IconButton icon={icons.trashcan} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import Progressbar from "../progressbar/Progressbar";
import "./Envelope.scss";
import IconButton from "../iconButton/IconButton";
import { icons } from "../../utils/icons";
import { shortenTitle } from "../../utils/stringWorker";
import { useDispatch } from "react-redux";
import { selectDocument } from "../../reducers/actions/documentActions";

export default function Envelope(props) {
  const dispatch = useDispatch();
  const handleOnChange = () => {
    dispatch(selectDocument(props.id, props.folder));
  };
  //const envelope = useSelector((root: rootState) => state?.document)

  return (
    <div
      className={props.isChecked ? "test-selected" : "test"}
      id={props.index}
      onClick={handleOnChange}
    >
      <div className="envelope-table-row">
        <div className="envelope-table-row-cell-checkbox">
          <input
            type="checkbox"
            id="isChecked"
            name="vehicle1"
            value={props.index}
            checked={props.isChecked}
          />
        </div>
        <div className="envelope-table-row-cell">
          <div className="document-info">
            <div className="document-title">
              <h1>
                {props.title.length > 30
                  ? shortenTitle(15, 13, props.title.length, props.title)
                  : props.title}
              </h1>
            </div>
            <div className="document-subtitle">Para: David Parras Martínez</div>
            <Avatar className="avatar">D</Avatar>
          </div>
        </div>
        <div className="envelope-table-row-cell">
          <div className="test-progressbar">
            <div className="progressbar">
              <Progressbar />
            </div>
          </div>
        </div>
        <div className="envelope-table-row-cell-date">
          <div className="envelope-table-row-cell-date-date-info">
            <div>
              <h1>
                {new Date(props.lastChange).getDate()}/
                {new Date(props.lastChange).getMonth()}/
                {new Date(props.lastChange).getFullYear()}
              </h1>
            </div>
            <div className="document-subtitle">
              {new Date(props.lastChange).getHours()}:
              {new Date(props.lastChange).getMinutes()}
            </div>
          </div>
        </div>
        <div className="envelope-table-row-cell">
          <div className="envelope-table-row-cell-iconbutton-container">
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
                props.handleClick({ id: props.id, action: "VIEW" })
              }
            >
              <IconButton icon={icons.eye} />
            </div>
            <div
              className="envelope-table-row-cell-iconbutton"
              onClick={() =>
                props.handleClick({ id: props.id, action: "DELETE" })
              }
            >
              <IconButton icon={icons.trashcan} />
            </div>
            <div
              className="envelope-table-row-cell-iconbutton"
              onClick={() =>
                props.handleClick({ id: props.id, action: "DOWNLOAD" })
              }
            >
              <IconButton icon={icons.download} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
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
  const handleInputChange = () => {
    console.log("isChecked");
  };

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
            name="isChecked"
            value={props.index}
            checked={props.isChecked}
            onChange={handleInputChange}
          />
        </div>
        <div className="envelope-table-row-cell">
          <div className="document-info">
            <div className="document-title">
              <h1>
                {props?.title?.length > 30
                  ? shortenTitle(15, 13, props?.title?.length, props?.title)
                  : props?.title}
              </h1>
            </div>
            <div className="document-subtitle">
              <h5>To:</h5>
              {props.recipients?.length > 1 ? (
                <div className="envelope-recipients">
                  <h5>{props.recipients[0]?.name}</h5>
                  <h5>{props.recipients[0]?.surname}</h5>
                  <h5>and {parseInt(props.recipients?.length) - 1} more</h5>
                </div>
              ) : (
                <div>
                  <h5>{props.recipients[0]?.name} </h5>
                  <h5>{props.recipients[0]?.surname} </h5>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="envelope-table-row-cell">
          <div className="test-progressbar">
            {props.completed ? (
              <div className="completed-icon">
                <i className={icons.checkCircle}></i>
              </div>
            ) : (
              <div className="incompleted-icon">
                <i className={icons.exclamationCircle}></i>
              </div>
            )}
          </div>
        </div>
        <div className="envelope-table-row-cell-date">
          <div className="envelope-table-row-cell-date-date-info">
            <div>
              <h1>
                {new Date(props.lastChange)
                  .getDate()
                  .toString()
                  .padStart(2, "0")}
                /
                {(new Date(props.lastChange).getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}
                /{new Date(props.lastChange).getFullYear()}
              </h1>
            </div>
            <div className="document-subtitle">
              {new Date(props.lastChange)
                .getHours()
                .toString()
                .padStart(2, "0")}
              :
              {new Date(props.lastChange)
                .getMinutes()
                .toString()
                .padStart(2, "0")}
            </div>
          </div>
        </div>
        <div className="envelope-table-row-cell">
          <div className="envelope-table-row-cell-iconbutton-container">
            {props.needsToSign ? (
              <div
                className="envelope-table-row-cell-iconbutton"
                onClick={(e) =>
                  props.handleClick(e, { id: props.id, action: "SIGN" })
                }
              >
                <IconButton icon={icons.pen} />
              </div>
            ) : (
              <div
                className="envelope-table-row-cell-iconbutton-hidden"
                onClick={(e) =>
                  props.handleClick(e, { id: props.id, action: "SIGN" })
                }
              >
                <IconButton icon={icons.signed} />
              </div>
            )}

            <div
              className="envelope-table-row-cell-iconbutton"
              onClick={(e) =>
                props.handleClick(e, { id: props.id, action: "VIEW" })
              }
            >
              <IconButton icon={icons.eye} />
            </div>
            <div
              className="envelope-table-row-cell-iconbutton"
              onClick={(e) =>
                props.handleClick(e, { id: props.id, action: "DELETE" })
              }
            >
              <IconButton icon={icons.trashcan} />
            </div>
            <div
              className="envelope-table-row-cell-iconbutton"
              onClick={(e) =>
                props.handleClick(e, { id: props.id, action: "DOWNLOAD" })
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

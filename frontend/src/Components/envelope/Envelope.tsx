import React, { useState } from "react";
import "./Envelope.scss";
import IconButton from "../iconButton/IconButton";
import { icons } from "../../utils/icons";
import { useDispatch } from "react-redux";
import { selectDocument } from "../../reducers/actions/documentActions";
import { useEnvelope } from "../../hooks/useEnvelope";
import EnvelopeDetails from "../envelopeDetails/EnvelopeDetails";
import { EnvelopeActions } from "../../types";

export default function Envelope(props) {
  const envelopeInfo = useEnvelope(props.userEmail, props.doc);
  const dispatch = useDispatch();
  const handleOnChange = () => {
    dispatch(selectDocument(props.id, props.folder));
  };
  const handleInputChange = () => {
    console.log("isChecked");
  };

  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <tr
        className={props.isChecked ? "selected-envelope" : "envelope"}
        id={props.index}
        onClick={handleOnChange}
      >
        <td
          className={envelopeInfo.completed ? "envelope-green" : "envelope-red"}
        >
          <input
            type="checkbox"
            id="isChecked"
            name="isChecked"
            value={props.index}
            checked={props.isChecked}
            onChange={handleInputChange}
          />
        </td>
        <td>
          <div className="document-info">
            <div className="document-title">
              <h1>{envelopeInfo.truncatedTitle}</h1>
            </div>
            <div className="document-subtitle">
              <div className="envelope-recipients">
                {envelopeInfo.destinataries}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="envelope-status">
            {envelopeInfo.completed ? (
              <div className="completed-icon">
                <i className={icons.checkCircle}></i>
                <h1>Completed</h1>
              </div>
            ) : (
              <div className="incompleted-icon">
                <i className={icons.exclamationCircle}></i>
                <h1>Pending</h1>
              </div>
            )}
          </div>
        </td>
        <td>
          <div className="envelope-date-cell">
            <div className="document-title">
              <h1>{envelopeInfo.getLastChange.date}</h1>
            </div>
            <div className="document-subtitle">
              {envelopeInfo.getLastChange.time}
            </div>
          </div>
        </td>
        <td>
          <div className="envelope-table-row-cell-iconbutton-container">
            {envelopeInfo.needsToSign ? (
              <div
                className="envelope-table-row-cell-iconbutton"
                onClick={(e) =>
                  props.handleClick(e, {
                    id: props.id,
                    action: EnvelopeActions.Sign,
                  })
                }
              >
                <IconButton icon={icons.pen} />
              </div>
            ) : (
              <div className="envelope-table-row-cell-iconbutton-hidden">
                <IconButton icon={icons.signed} />
              </div>
            )}

            <div
              className="envelope-table-row-cell-iconbutton"
              onClick={(e) =>
                props.handleClick(e, {
                  id: props.id,
                  action: EnvelopeActions.View,
                })
              }
            >
              <IconButton icon={icons.eye} />
            </div>
            <div
              className="envelope-table-row-cell-iconbutton"
              onClick={(e) =>
                props.handleClick(e, {
                  id: props.id,
                  action: EnvelopeActions.Delete,
                })
              }
            >
              <IconButton icon={icons.trashcan} />
            </div>
            <div
              className="envelope-table-row-cell-iconbutton"
              onClick={(e) =>
                props.handleClick(e, {
                  id: props.id,
                  action: EnvelopeActions.Download,
                })
              }
            >
              <IconButton icon={icons.download} />
            </div>
            <div
              className="envelope-table-row-cell-iconbutton"
              onClick={handleShowDetails}
            >
              {showDetails ? (
                <IconButton icon={icons.minus} />
              ) : (
                <IconButton icon={icons.plus} />
              )}
            </div>
          </div>
        </td>
      </tr>
      {showDetails ? (
        <EnvelopeDetails
          recipients={envelopeInfo.detailedRecipients}
          completed={envelopeInfo.completed}
        />
      ) : (
        <></>
      )}
    </>
  );
}

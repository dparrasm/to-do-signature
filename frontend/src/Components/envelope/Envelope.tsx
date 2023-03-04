import React, { useState } from "react";
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
        <td className={props.Completed ? "envelope-green" : "envelope-red"}>
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
              <h1>
                {props?.title?.length > 30
                  ? shortenTitle(15, 13, props?.title?.length, props?.title)
                  : props?.title}
              </h1>
            </div>
            <div className="document-subtitle">
              {props.recipients?.length > 1 ? (
                <div className="envelope-recipients">
                  <>
                    {props?.recipients?.length > 0
                      ? "To: " + props.recipients[0]?.name
                      : ""}
                  </>
                  <>
                    {props?.recipients?.length > 0
                      ? props?.recipients[0]?.surname
                      : ""}
                  </>
                  <> and {parseInt(props.recipients?.length) - 1} more</>
                </div>
              ) : (
                <div>
                  <h5>
                    {props?.recipients?.length > 0
                      ? "To: " + props.recipients[0]?.name
                      : ""}
                  </h5>
                  <h5>
                    {props?.recipients?.length > 0
                      ? props?.recipients[0]?.surname
                      : ""}
                  </h5>
                </div>
              )}
            </div>
          </div>
        </td>
        <td>
          <div className="envelope-status">
            {props.completed ? (
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
        </td>
        <td>
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
        <tr className="envelope-details-row">
          <td></td>
          <td colSpan={5}>
            <div className="envelope-details-table-container">
              <table className="envelope-details-table">
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <thead>
                  <tr className="envelope-details-table-head">
                    <th>User</th>
                    <th>Email</th>
                    <th>Needs to</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {props.recipients.map((r) => (
                    <tr className="envelope-details-table-row">
                      <td>
                        {r.name} {r.surname}
                      </td>
                      <td>{r.email}</td>
                      <td>{r.needsToSign ? "SIGN" : "VIEW"}</td>
                      <td className="envelope-details-status-data">
                        {props.completed ? (
                          <div className="completed-icon-table-row">
                            <i className={icons.checkCircle}></i>
                            <h1>Completed</h1>
                          </div>
                        ) : (
                          <div className="incompleted-icon-table-row">
                            <i className={icons.exclamationCircle}></i>
                            <h1>Pending</h1>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      ) : (
        <></>
      )}
    </>
  );
}

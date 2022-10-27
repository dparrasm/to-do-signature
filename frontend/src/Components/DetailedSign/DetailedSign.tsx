import React from "react";
import { Avatar } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  deleteDocument,
  getDocument,
} from "../../reducers/actions/documentActions";
import SplitButton from "../splitButton/SplitButton";
import "./DetailedSign.scss";
import { useDispatch } from "react-redux";
import Progressbar from "../progressbar/Progressbar";

export default function DetailedSign(props) {
  const dispatch = useDispatch();
  const handleClick = (documentAction: { id: number; action: String }) => {
    switch (documentAction.action) {
      case "DELETE":
        console.log("Borrando documento " + documentAction.id);
        dispatch(deleteDocument(documentAction.id));
        break;
      case "DOWNLOAD":
        console.log("Downloading document " + documentAction.id);
        break;
      case "SIGN":
        console.log("Firmando documento " + documentAction.id);
        dispatch(getDocument(documentAction.id));
        props.handleSign();
        break;
      default:
        console.log("Unknown action");
    }
  };

  const documentsToSign = props.documentsToSign;

  return (
    <>
      <table className="table">
        <tbody>
          <tr>
            <th></th>
            <th>Subject</th>
            <th>Status</th>
            <th>Last change</th>
          </tr>
          {documentsToSign?.map((d, index) => (
            <tr>
              <td className="td-checkbox">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
              </td>
              <td>
                <div className="document-info">
                  <div className="document-title">{d.title}</div>
                  <div className="document-subtitle">
                    Para: David Parras Martínez
                  </div>
                  <Avatar className="avatar">D</Avatar>
                </div>
              </td>
              <td>
                <div className="progressbar">
                  <Progressbar />
                </div>
              </td>
              <td>
                <div>
                  <div>01/01/1999</div>
                  <div className="document-subtitle">14:06</div>
                </div>
              </td>
              <td>{d.date}</td>
              <td>
                <SplitButton id={d._id} handleClick={handleClick} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

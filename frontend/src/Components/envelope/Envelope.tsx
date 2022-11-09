import React from "react";
import { Avatar } from "@material-ui/core";
import SplitButton from "../splitButton/SplitButton";
import { useDispatch } from "react-redux";
import Progressbar from "../progressbar/Progressbar";
import {
  deleteDocument,
  getDocument,
} from "../../reducers/actions/documentActions";
import "./Envelope.scss";

export default function Envelope(props) {
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
                  <div>
                    {new Date(d.date).getDate()}/{new Date(d.date).getMonth()}/
                    {new Date(d.date).getFullYear()}
                  </div>
                  <div className="document-subtitle">
                    {new Date(d.date).getHours()}:
                    {new Date(d.date).getMinutes()}
                  </div>
                </div>
              </td>
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

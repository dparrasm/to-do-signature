import React, { Component } from "react";
import { Avatar, Button } from "@material-ui/core";
import store from "../../store";
import { deleteDocument } from "../../reducers/actions/documentActions";
import SplitButton from "../splitButton/SplitButton";
import "./DetailedSign.scss";
import { useDispatch } from "react-redux";
import { setPath } from "../../reducers/actions/routerActions";

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
        props.handleSign();
        // dispatch(setPath("/sign"));
        break;
      default:
        console.log("Unknown action");
    }
  };

  const documentsToSign = props.documentsToSign;

  return (
    <>
      <table className="table">
        <tr>
          <th>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          </th>
          <th>Asunto</th>
          <th>Estado</th>
          <th></th>
        </tr>
        {documentsToSign?.map((d, index) => (
          <tr>
            <td>
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
                <div className="document-subtitle">
                  Última modificación: 01/01/1999
                </div>
              </div>
            </td>
            <td>
              <Avatar className="signatures-avatar">D</Avatar>
            </td>
            <td>{d.date}</td>
            <td>
              <SplitButton id={d._id} handleClick={handleClick} />
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}

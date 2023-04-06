import React from "react";
import { icons } from "../../utils/icons";
import Filepicker from "../filepicker/Filepicker";
import "./DragAndDrop.scss";
import { useDropzone } from "react-dropzone";
import { uploadDocument } from "../../reducers/actions/documentActions";
import { rootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function DragAndDrop(props) {
  const user = useSelector((state: rootState) => state.auth?.user?.email);
  const history = useHistory();
  const dispatch = useDispatch();
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    multiple: true,
    onDrop: (acceptedFiles) => {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64Content = reader.result;
          dispatch(
            uploadDocument({
              author: user,
              title: file.name,
              fileContent: base64Content,
              recipients: [""],
              signed: false,
            })
          );
        };
      }
      if (!history.location.pathname.includes("prepare")) {
        history.push("/prepare");
      }
    },
  });

  return (
    <div className="drag-and-drop" {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="button-container">
        <div className="drag-and-drop-file-icon-container">
          <i className={icons.fileUpload}></i>
        </div>
        <Filepicker title={props.title} accept=".pdf" multiple={true} />
      </div>
      {/* {isDragActive ? (
        <p>Suelta los archivos aquí</p>
      ) : (
        <p>
          Arrastra y suelta los archivos aquí o haz clic para seleccionarlos
        </p>
      )} */}
    </div>
  );
}

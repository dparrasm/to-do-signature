import React from "react";
import { icons } from "../../utils/icons";
import Filepicker from "../filepicker/Filepicker";
import "./DragAndDrop.scss";
import { useDropzone } from "react-dropzone";

export default function DragAndDrop(props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".pdf",
    multiple: true,
    onDrop: (acceptedFiles) => {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64Content = reader.result;
          console.log(file.name, base64Content);
          // Aquí puedes hacer algo con el contenido en base64 del archivo
        };
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

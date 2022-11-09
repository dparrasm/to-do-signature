import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "./Card.scss";

export default function Card(props) {
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = (pdf) => {
    setNumPages(pdf?.numPages);
  };

  const loadError = () => {
    //TODO mostrar pagina si documento no se ha cargado !!
    return <h2>Sorry, document can't be loaded. Try again later</h2>;
  };
  return (
    <div>
      <div className="delete-document-button">
        <button>X</button>
      </div>
      <div className="document-container">
        <Document
          file={props.fileContent}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={loadError}
        >
          <Page className="card-image" pageNumber={1} scale={0.4} />
        </Document>
        <div className="card-info-container">
          <div className="card-info">
            <h1>{props.title}</h1>
            <h2>{numPages} Pages</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

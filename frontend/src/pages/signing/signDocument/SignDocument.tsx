import "./SignDocument.scss";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../reducers";
import { icons } from "../../../utils/icons";
import MenuItem from "../../../components/menuItem/MenuItem";
import { Link } from "react-router-dom";
import {
  postDocuments,
  removeUploadedDocuments,
  signDocument,
} from "../../../reducers/actions/documentActions";
import IconButton from "../../../components/iconButton/IconButton";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function SignDocument(props) {
  const [numPages, setNumPages] = useState(null);
  const user: any = useSelector((state: rootState) => state?.auth?.user);
  const envelope: any = useSelector((state: rootState) => state?.envelope);
  const [index, setIndex] = useState(0);
  const [document, setDocument] = useState(envelope?.documents);

  const dispatch = useDispatch();
  const sign = () => {
    document.map((doc) => dispatch(signDocument(doc._id, user.email)));
  };
  const nextDocument = () => {
    const length = document.length - 1;
    if (index < length) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };
  const previousDocument = () => {
    const length = document.length - 1;
    if (index > 0) {
      setIndex(index + 1);
    } else {
      setIndex(length);
    }
  };
  const removeDocuments = () => {
    dispatch(removeUploadedDocuments());
  };
  const sendEnvelope = () => {
    const recipient = {
      name: user?.name + " " + user?.surname,
      email: user.email,
      isAuthor: true,
      folder: "SENT",
      needsToSign: true,
      needsToView: false,
      signed: false,
      viewed: true,
    };
    const recipientsNoId = envelope?.recipients?.map(
      ({ id, ...recipients }) => recipients
    );
    dispatch(
      postDocuments({
        documents: envelope?.documents,
        lastChange: new Date(),
        recipients:
          recipientsNoId?.length > 0
            ? recipientsNoId.concat(recipient)
            : [recipient],
        signedBy: [""],
        signed: false,
        viewed: false,
        email: envelope?.email,
      })
    );
    dispatch(removeUploadedDocuments());
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function loadError() {
    //TODO mostrar pagina si documento no se ha cargado !!
    return <h2>Sorry, document can't be loaded. Try again later</h2>;
  }

  return (
    <div className="signing-container">
      <div className="sign-document-header">
        <h6>Drag and drop fields from the left panel onto the document</h6>
        <Link to="/manage">
          <button onClick={removeDocuments}>X</button>
        </Link>
      </div>
      <div className="root-sign-document">
        <div className="sign-tools" id="signTools">
          <div className="container-tools">
            <div className="signing-menu-block">
              <h3>Fields</h3>
            </div>
            <div className="signing-menu-block-items">
              <div onClick={sign}>
                <MenuItem icon={icons.signed} text="Autofirma" />
              </div>
            </div>
            <div className="signing-buttons-container">
              <Link to="/manage/inbox">
                <button className="signing-button-save" onClick={sendEnvelope}>
                  Send
                </button>
              </Link>
              <button className="signing-button-discard">Discard</button>
            </div>
          </div>
        </div>
        <div className="document-to-sign-container">
          <div className="document-info-header">
            <div className="sign-document-buttons" onClick={previousDocument}>
              <IconButton icon={icons.previous} />
            </div>
            <div className="sign-document-title">
              <h1>{document[index].title}</h1>
            </div>
            <div className="sign-document-buttons" onClick={nextDocument}>
              <IconButton icon={icons.next} />
            </div>
          </div>
          <div className="signing-display-document">
            <div>
              <Document
                file={document[index].fileContent}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={loadError}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div>
                    <Page
                      key={`page_${index + 1}`}
                      scale={1.5}
                      pageNumber={index + 1}
                    ></Page>
                  </div>
                ))}
              </Document>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignDocument;

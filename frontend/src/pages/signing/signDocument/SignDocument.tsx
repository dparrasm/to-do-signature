import "./SignDocument.scss";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from "react-redux";
import { rootState } from "../../reducers";
import { StyleSheet } from "@react-pdf/renderer";
import { Button } from "@material-ui/core";
import { icons } from "../../../utils/icons";
import SignModal from "../signModal/SignModal";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
function SignDocument(props) {
  const [numPages, setNumPages] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const document: any = useSelector(
    (state: rootState) => state?.document?.readingDocument?.fileContent
  );
  // Hook from pdf library to control pageNumber maybe use later
  // const [pageNumber, setPageNumber] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function loadError() {
    //TODO mostrar pagina si documento no se ha cargado !!
    return <h2>Sorry, document can't be loaded. Try again later</h2>;
  }

  const openSignModal = () => {
    setModalOpen(true);
  };
  const closeSignModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="root-sign-document">
      <div className="sign-tools">
        <div className="container-tools">
          <h2>SIGN &amp; EDIT</h2>
          <h3>CAMPOS</h3>
          ---------------
          <h6>Firma</h6>
          <h6>Iniciales</h6>
          <h6>Fecha de la firma</h6>
          ----------------
          <h6>Nombre completo</h6>
          <h6>Nombre</h6>
          <h6>Apellidos</h6>
          <h6>Direccion de correo electrónico</h6>
          ----------------
          <h6>Texto</h6>
          <Button onClick={openSignModal} variant="contained" color="primary">
            <i className={`${icons.pen} margin-right-10`} />
            Add signature
          </Button>
        </div>
      </div>
      <div className="document-container">
        <Document
          file={document}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={loadError}
        >
          <Page pageNumber={1} />
        </Document>
        <SignModal shouldOpenModal={isModalOpen} handleClose={closeSignModal} />
      </div>
    </div>
  );
}

export default SignDocument;

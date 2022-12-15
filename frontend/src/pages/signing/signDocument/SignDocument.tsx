import "./SignDocument.scss";
import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../../reducers";
import { icons } from "../../../utils/icons";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { uploadEnvelope } from "../../../reducers/actions/envelopeActions";
import MenuItem from "../../../components/menuItem/MenuItem";
import { Link } from "react-router-dom";
import Bag from "../../../components/bag/Bag";
import { postDocuments } from "../../../reducers/actions/documentActions";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function SignDocument(props) {
  const [numPages, setNumPages] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const user: any = useSelector((state: rootState) => state?.auth?.user);
  const envelope: any = useSelector((state: rootState) => state?.envelope);
  const [document, nextDocument] = useState(envelope?.documents[0].fileContent);
  const dispatch = useDispatch();
  const signTools = useRef<HTMLDivElement>(null);
  const documentInfoHeader = useRef<HTMLDivElement>(null);
  const signDocumentHeader = useRef<HTMLDivElement>(null);
  const [bag, setBag] = useState(false);
  const activateBag = () => setBag(bag ? false : true);
  const pdf = useRef<HTMLDivElement>(null);
  // Hook from pdf library to control pageNumber maybe use later
  // const [pageNumber, setPageNumber] = useState(null);
  const autofirma = () => {
    AutoScript.cargarAppAfirma();
    try {
      AutoScript.sign(
        document,
        "SHA512withRSA",
        "PAdES",
        null,
        firmaCorrectaCallback,
        firmaErrorCallback
      );
    } catch (e) {
      firmaErrorCallback(
        AutoScript.getErrorType(),
        AutoScript.getErrorMessage()
      );
    }
    function firmaErrorCallback(type, message) {
      console.log("erro type: " + type);
      console.log("message: " + message);
    }

    function firmaCorrectaCallback() {
      console.log();
    }
  };

  const sendEnvelope = () => {
    const recipient = {
      name: user?.name + " " + user?.surname,
      email: user.email,
      isAuthor: true,
      folder: "SENT",
    };
    console.log("Antes: " + JSON.stringify(envelope.recipients));
    const recipientsNoId = envelope?.recipients?.map(
      ({ id, ...recipients }) => recipients
    );
    console.log(JSON.stringify(recipientsNoId));
    envelope?.documents.map((d) => {
      dispatch(
        postDocuments({
          title: d.title,
          fileContent: d.fileContent,
          lastChange: new Date(),
          recipients:
            recipientsNoId?.length > 0
              ? recipientsNoId.concat(recipient)
              : [recipient],
          signedBy: [""],
          signed: false,
          viewed: false,
        })
      );
    });
  };
  async function handleMouseUp(event) {
    const height = pdf?.current?.offsetHeight ? pdf?.current?.offsetHeight : 0;
    const signToolsWidth = signTools?.current?.offsetWidth
      ? signTools?.current?.offsetWidth
      : 0;
    const documentInfoHeaderHeight = documentInfoHeader?.current?.offsetHeight
      ? documentInfoHeader?.current?.offsetHeight
      : 0;
    const signDocumentHeaderHeight = signDocumentHeader?.current?.offsetHeight
      ? signDocumentHeader?.current?.offsetHeight
      : 0;
    const realHeight = documentInfoHeaderHeight + signDocumentHeaderHeight;

    const x =
      Math.round(Math.abs(event.clientX - event.target.offsetLeft)) -
      signToolsWidth;
    const y = Math.abs(height - event.clientY) + realHeight;
    setCoords({
      x,
      y,
    });
    return <Bag top={y} left={x} />;
  }
  async function modifyPdf() {
    const pdfDoc = await PDFDocument.load(document);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    firstPage.drawText("[" + coords.x + ", " + coords.y + "]", {
      x: coords.x,
      y: coords.y,
      size: 30,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
    });
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    const envelope = {
      documents: [{ fileContent: pdfDataUri }],
      recipients: [""],
      email: {
        subject: "test",
        message: "test",
      },
    };
    dispatch(uploadEnvelope(envelope));
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function loadError() {
    //TODO mostrar pagina si documento no se ha cargado !!
    return <h2>Sorry, document can't be loaded. Try again later</h2>;
  }

  return (
    <div className="signing-container">
      <div ref={signDocumentHeader} className="sign-document-header">
        <h6>Drag and drop fields from the left panel onto the document</h6>
        <Link to="/manage">
          <button>X</button>
        </Link>
      </div>
      <div className="root-sign-document">
        <div ref={signTools} className="sign-tools" id="signTools">
          <div className="container-tools">
            <div className="signing-menu-block">
              <h3>Fields</h3>
            </div>
            <div className="signing-menu-block">
              <div onClick={autofirma}>
                <MenuItem icon={icons.signed} text="Autofirma" />
              </div>
            </div>
            <div className="signing-menu-block">
              <div onClick={activateBag}>
                <MenuItem icon={icons.signed} text="Signature" />
              </div>
              <h6>Initial</h6>
              <MenuItem icon={icons.calendar} text="Date signed" />
            </div>
            <div className="signing-menu-block">
              <h6>Complete Name</h6>
              <h6>First Name</h6>
              <h6>Last Name</h6>
              <h6>Email Adress</h6>
            </div>
            <div className="signing-menu-block">
              <MenuItem icon={icons.text} text="Text" />
            </div>
            <div className="signing-buttons-container">
              <button className="signing-button-save" onClick={sendEnvelope}>
                Send
              </button>
              <button className="signing-button-discard">Discard</button>
            </div>
          </div>
        </div>
        <div className="document-to-sign-container" onMouseUp={handleMouseUp}>
          <div ref={documentInfoHeader} className="document-info-header">
            <h1>document title</h1>
          </div>
          <div className="signing-display-document">
            <div>
              <Document
                file={document}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={loadError}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div ref={pdf}>
                    <Page
                      key={`page_${index + 1}`}
                      scale={1}
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

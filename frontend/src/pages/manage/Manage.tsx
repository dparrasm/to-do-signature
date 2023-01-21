import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Envelope from "../../components/envelope/Envelope";
import { rootState } from "../../reducers";
import {
  deleteDocument,
  downloadDocument,
  loadDocuments,
  selectAllDocuments,
  signDocument,
} from "../../reducers/actions/documentActions";
import Searchbar from "../../components/searchbar/Searchbar";
import "./Manage.scss";
import Column from "../../components/column/Column";
import { uploadEnvelopeByDocumentId } from "../../reducers/actions/envelopeActions";

export interface document {
  readingDocument: any;
  _id: String;
  author: String;
  lastChange: String;
  title: String;
  signed: String;
  viewed: String;
  searchedDocuments: any;
}
export default function Manage(props) {
  const documentState: document = useSelector(
    (state: rootState) => state?.document
  );
  const user = useSelector((state: rootState) => state?.auth?.user);
  const dispatch = useDispatch();
  const [checkAll, setCheckAll] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const page = location.pathname.replace("/manage/", ""); //props?.match?.params?.page ? props.match.params.page : "Inbox";

  const handleOnChange = () => {
    setCheckAll(!checkAll);
    dispatch(selectAllDocuments(page, checkAll));
  };

  useEffect(() => {
    setCheckAll(false);
  }, [page]);

  const handleClick = (documentAction: { id: number; action: String }) => {
    switch (documentAction.action) {
      case "VIEW":
        console.log("Visualizando documento " + documentAction.id);
        dispatch(uploadEnvelopeByDocumentId(documentAction.id));
        history.push("/sign");
        break;
      case "DELETE":
        console.log("Borrando documento " + documentAction.id);
        dispatch(deleteDocument(documentAction.id, page));
        break;
      case "DOWNLOAD":
        dispatch(downloadDocument(documentAction.id));
        break;
      case "SIGN":
        console.log("Firmando documento " + documentAction.id);
        dispatch(signDocument(documentAction.id, user.email));
        break;
      default:
        console.log("Unknown action");
    }
  };

  useEffect(() => {
    dispatch(loadDocuments(user?.email));
  }, [dispatch]);

  return (
    <div className="container-manager">
      <div className="column">
        <Column />
      </div>
      <div className="container-documents">
        <div className="table-header">
          <div className="tab">
            <div>
              <h1>{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
            </div>
            <div className="received-signature-searchbar">
              <Searchbar page={page} />
            </div>
          </div>
          <div>
            <div className="button-bar">
              <input
                type="checkbox"
                id="checkAll"
                name="checkAll"
                value="checkAll"
                checked={checkAll}
                onChange={handleOnChange}
              />
              <div>
                <button>Sign</button>
                <button className="middle-button ">Send again</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
          <div className="table-columns">
            <div className="table-column">
              <h1>Title</h1>
            </div>
            <div className="table-column">
              <h1>Status</h1>
            </div>
            <div className="table-column">
              <h1>Last change</h1>
            </div>
          </div>
        </div>
        <div className="table-body">
          {documentState.searchedDocuments.length > 0
            ? documentState.searchedDocuments.map((doc, index) => (
                <Envelope
                  key={index}
                  index={index}
                  id={doc._id}
                  title={doc.title}
                  folder={page}
                  lastChange={doc.lastChange}
                  handleOnChange={handleOnChange}
                  handleClick={handleClick}
                  isChecked={doc.isChecked}
                />
              ))
            : documentState[page]?.map((doc, index) => (
                <Envelope
                  key={index}
                  index={index}
                  id={doc._id}
                  title={doc.title}
                  folder={page}
                  lastChange={doc.lastChange}
                  handleOnChange={handleOnChange}
                  handleClick={handleClick}
                  isChecked={doc.isChecked}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

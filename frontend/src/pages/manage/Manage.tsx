import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Envelope from "../../components/envelope/Envelope";
import { rootState } from "../../reducers";
import {
  deleteDocument,
  downloadDocument,
  loadDocuments,
  selectAllDocuments,
  sendUnsignedDocumentsReminder,
  signDocument,
  unselectDocuments,
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
  inbox: any;
  sent: any;
}
export default function Manage(props) {
  const documentState: document = useSelector(
    (state: rootState) => state?.document
  );
  const inboxState = useSelector((state: rootState) => state?.document?.inbox);
  const sentState = useSelector((state: rootState) => state?.document?.sent);
  const user = useSelector((state: rootState) => state?.auth?.user);
  const selectedDocuments = useSelector(
    (state: rootState) => state?.document?.selectedDocuments
  );
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const [checkAll, setCheckAll] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const page = location.pathname.replace("/manage/", "");
  const getSearchText = (text) => {
    setSearchText(text);
  };
  const inboxJsonString = JSON.stringify(inboxState);
  const [prevInboxState, setPrevInboxState] = useState(inboxJsonString);
  const sentJsonString = JSON.stringify(sentState);
  const [prevSentState, setPrevSentState] = useState(sentJsonString);
  const documentsJsonString = JSON.stringify(documentState);
  const displayEnvelopes = () => {
    if (searchText.length > 0) {
      return documentState.searchedDocuments.map((doc, index) => (
        <>
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
            completed={doc.signed && doc.viewed ? true : false}
            userId={user._id}
            needsToSign={
              doc.recipients.find((r) => r.email === user.email).needsToSign
            }
            needsToView={
              doc.recipients.find((r) => r.email === user.email).needsToView
            }
            recipients={doc.recipients}
          />
          <div />
        </>
      ));
    } else {
      return documentState[page]?.map((doc, index) => (
        <>
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
            completed={doc.signed && doc.viewed ? true : false}
            userId={user._id}
            needsToSign={
              doc.recipients.find((r) => r.email === user.email).needsToSign
            }
            needsToView={
              doc.recipients.find((r) => r.email === user.email).needsToView
            }
            recipients={doc.recipients}
          />
        </>
      ));
    }
  };

  const handleOnChange = () => {
    if (!checkAll) {
      dispatch(selectAllDocuments(page, checkAll));
    } else {
      dispatch(unselectDocuments(page));
    }
    setCheckAll(!checkAll);
  };

  const handleClick = (
    event,
    documentAction: { id: number; action: String }
  ) => {
    event.stopPropagation();
    switch (documentAction.action) {
      case "VIEW":
        dispatch(uploadEnvelopeByDocumentId(documentAction.id));
        setTimeout(() => {
          history.push("/sign");
        }, 1000);

        break;
      case "DELETE":
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
  const multipleAction = (action: string) => {
    const array = [...selectedDocuments];
    switch (action) {
      case "delete":
        return array.map((doc) => {
          dispatch(deleteDocument(doc._id, page));
        });
      case "signature":
        return array.map((doc) => {
          dispatch(signDocument(doc._id, user?.email));
        });
      default:
        console.log("Send document again");
        dispatch(sendUnsignedDocumentsReminder(selectedDocuments, page));
    }
    unselectDocuments(page);
  };

  useEffect(() => {
    dispatch(unselectDocuments(page));
    if (checkAll) {
      setCheckAll(false);
    }
  }, [location, page]);

  useEffect(() => {
    if (
      inboxJsonString === prevInboxState ||
      sentJsonString === prevSentState
    ) {
      dispatch(loadDocuments(user?.email));
    }
  }, [inboxJsonString, sentJsonString]);
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
              <Searchbar page={page} getSearchText={getSearchText} />
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
              {selectedDocuments.length > 0 ? (
                <div className="manage-button-bar">
                  <button onClick={() => multipleAction("signature")}>
                    Sign
                  </button>
                  <button
                    className="middle-button "
                    onClick={() => multipleAction("")}
                  >
                    Send again
                  </button>
                  <button onClick={() => multipleAction("delete")}>
                    Delete
                  </button>
                </div>
              ) : (
                <div>
                  <button>Sign</button>
                  <button className="middle-button ">Send again</button>
                  <button>Delete</button>
                </div>
              )}
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
        <div className="table-body">{displayEnvelopes()}</div>
      </div>
    </div>
  );
}

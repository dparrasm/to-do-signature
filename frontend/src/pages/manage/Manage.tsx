import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Envelope from "../../components/envelope/Envelope";
import { rootState } from "../../reducers";
import {
  deleteDocument,
  downloadDocument,
  selectAllDocuments,
  sendUnsignedDocumentsReminder,
  signDocument,
  unselectDocuments,
} from "../../reducers/actions/documentActions";
import Searchbar from "../../components/searchbar/Searchbar";
import "./Manage.scss";
import Column from "../../components/column/Column";
import { uploadEnvelopeByDocumentId } from "../../reducers/actions/envelopeActions";
import { EnvelopeActions } from "../../types";

export interface DocumentState {
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
export default function Manage() {
  const documentState: DocumentState = useSelector(
    (state: rootState) => state?.document
  );
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
  const displayEnvelopes = () => {
    const documents = searchText
      ? documentState.searchedDocuments
      : documentState[page] || [];

    return documents.map((doc, index) => (
      <React.Fragment key={`envelope-${doc._id}`}>
        <Envelope
          index={index}
          doc={doc}
          id={doc._id}
          folder={page}
          handleOnChange={handleOnChange}
          handleClick={handleClick}
          isChecked={doc.isChecked}
          userEmail={user.email}
        />
      </React.Fragment>
    ));
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
    const { View, Delete, Download, Sign } = EnvelopeActions;
    switch (documentAction.action) {
      case View:
        dispatch(uploadEnvelopeByDocumentId(documentAction.id));
        setTimeout(() => {
          history.push("/sign");
        }, 1000);
        break;
      case Delete:
        dispatch(deleteDocument(documentAction.id, page));
        break;
      case Download:
        dispatch(downloadDocument(documentAction.id));
        break;
      case Sign:
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
    dispatch(unselectDocuments(page));
  };

  useEffect(() => {
    dispatch(unselectDocuments(page));
    if (checkAll) {
      setCheckAll(false);
    }
  }, [location, page]);

  return (
    <div className="manage-content">
      <div className="manage-column-menu">
        <Column />
      </div>
      <div className="manage-content-dashboard">
        <div className="manage-content-dashboard-header">
          <div className="manage-content-dashboard-folder">
            <h1>{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
            <h2>
              {page === "sent"
                ? "Select the documents you want to sign, visualize, resend or delete"
                : "Here you will find the documents you must sign or visualize"}
            </h2>
          </div>
          <div className="received-signature-searchbar">
            <Searchbar page={page} getSearchText={getSearchText} />
          </div>
        </div>
        <div className="button-bar">
          {selectedDocuments.length > 0 ? (
            <div className="manage-button-bar">
              <button onClick={() => multipleAction("signature")}>Sign</button>
              <button onClick={() => multipleAction("")}>Resend</button>
              <button onClick={() => multipleAction("delete")}>Delete</button>
            </div>
          ) : (
            <div className="manage-button-bar-disabled">
              <button>Sign</button>
              <button>Resend</button>
              <button>Delete</button>
            </div>
          )}
          <div>
            <h1>{selectedDocuments.length} items selected</h1>
          </div>
        </div>
        <table>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "35%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "35%" }} />
          </colgroup>
          <thead>
            <tr>
              <th className="manage-checkAll-checkbox">
                <input
                  type="checkbox"
                  id="checkAll"
                  name="checkAll"
                  value="checkAll"
                  checked={checkAll}
                  onChange={handleOnChange}
                />
              </th>
              <th>Title</th>
              <th className="manage-status-cell">Status</th>
              <th>Last change</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documentState[page] ? (
              displayEnvelopes()
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="manage-empty-folder-message">
                    <h1>This folder is empty</h1>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Envelope from "../../components/envelope/Envelope";
import { rootState } from "../../reducers";
import {
  deleteDocument,
  downloadDocument,
  getDocument,
  loadDocuments,
  selectAllDocuments,
} from "../../reducers/actions/documentActions";
import Searchbar from "../../components/searchbar/Searchbar";
import "./Manage.scss";
import Column from "../../components/column/Column";

export interface document {
  readingDocument: any;
  _id: String;
  author: String;
  lastChange: String;
  title: String;
}
export default function Manage(props) {
  const documentState: document = useSelector(
    (state: rootState) => state?.document
  );
  const user = useSelector((state: rootState) => state?.auth?.user);

  const page = props?.match?.params?.page ? props.match.params.page : "Inbox";

  const dispatch = useDispatch();

  const [checkAll, setCheckAll] = useState(false);

  const handleOnChange = () => {
    setCheckAll(!checkAll);
    dispatch(selectAllDocuments(page, checkAll));
  };

  useEffect(() => {
    setCheckAll(false);
  }, [page]);

  const handleClick = (documentAction: { id: number; action: String }) => {
    switch (documentAction.action) {
      case "DELETE":
        console.log("Borrando documento " + documentAction.id);
        dispatch(deleteDocument(documentAction.id, page));
        break;
      case "DOWNLOAD":
        dispatch(downloadDocument(documentAction.id));
        break;
      case "SIGN":
        console.log("Firmando documento " + documentAction.id);
        dispatch(getDocument(documentAction.id));
        props.handleSign();
        break;
      default:
        console.log("Unknown action");
    }
  };

  useEffect(() => {
    dispatch(loadDocuments(user.email));
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
              <Searchbar />
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
          {documentState[page]?.map((doc, index) => (
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

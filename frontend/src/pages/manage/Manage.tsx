import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Envelope from "../../components/envelope/Envelope";
import { rootState } from "../../reducers";
import {
  deleteDocument,
  getDocument,
  loadDocuments,
} from "../../reducers/actions/documentActions";
import Searchbar from "../../components/searchbar/Searchbar";
import "./Manage.scss";
import Column from "../../components/column/Column";

export interface document {
  _id: String;
  author: String;
  lastChange: String;
  title: String;
}
export default function Manage(props) {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const addChecked = (e) => {
    const currentPage = documents[page];
    setSelectedDocuments([...selectedDocuments, currentPage[e.target.value]]);
    // console.log("ADD: " + e.target.value);
    // console.log(JSON.stringify(selectedDocuments.length));
  };
  const removeChecked = (e) => {
    const currentPage = documents[page];
    const array = selectedDocuments;
    setSelectedDocuments(
      array.filter((a) => a._id !== currentPage[e.target.value]._id)
    );
  };
  const dispatch = useDispatch();

  const handleClick = (documentAction: { id: number; action: String }) => {
    console.log(JSON.stringify(documentAction));
    switch (documentAction.action) {
      case "DELETE":
        console.log("Borrando documento " + documentAction.id);
        dispatch(deleteDocument(documentAction.id, page));
        break;
      case "DOWNLOAD":
        console.log("Downloading document " + documentAction.id);
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
  const documents: document[] = useSelector(
    (state: rootState) => state?.document
  );
  const user = useSelector((state: rootState) => state?.auth?.user);

  const handleSign = () => {
    return console.log("Handlesign");
  };

  useEffect(() => {
    dispatch(loadDocuments(user.email));
    console.log("TEST" + JSON.stringify(selectedDocuments));
  }, [dispatch, selectedDocuments]);

  const page = props?.match?.params?.page ? props.match.params.page : "Inbox";

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
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                checked={isChecked}
                onChange={handleOnChange}
              />
              <div>
                <button>Sign</button>
                <button className="middle-button ">Send again</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-body">
          {documents[page]?.map((doc, index) => (
            <Envelope
              key={index}
              index={index}
              id={doc._id}
              title={doc.title}
              lastChange={doc.lastChange}
              addChecked={addChecked}
              removeChecked={removeChecked}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

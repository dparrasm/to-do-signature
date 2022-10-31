import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Envelope from "../../components/envelope/Envelope";
import { rootState } from "../../reducers";
import { loadDocuments } from "../../reducers/actions/documentActions";
import Searchbar from "../../components/searchbar/Searchbar";
import "./Manage.scss";
import Column from "../../components/column/Column";

export interface document {
  _id: String;
  author: String;
  date: String;
  title: String;
}
export default function Manage() {
  const dispatch = useDispatch();
  const documentsToSign: document[] = useSelector(
    (state: rootState) => state?.document?.documentsLoaded
  );

  const handleSign = () => {
    return console.log("Handlesign");
  };

  const openPrepareModal = () => {
    setModalOpen(true);
  };
  const closePrepareModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    dispatch(loadDocuments());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="column">
        <Column />
      </div>
      <div className="container-documents">
        <div className="table-header">
          <div className="tab">
            <div>
              <h1>Inbox</h1>
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
              />
              <div>
                <button>Sign</button>
                <button className="middle-button ">Send again</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Envelope handleSign={handleSign} documentsToSign={documentsToSign} />
        </div>
      </div>
    </div>
  );
}

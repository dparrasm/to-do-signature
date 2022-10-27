import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailedSign from "../../components/detailedSign/DetailedSign";
import { rootState } from "../../reducers";
import { loadDocuments } from "../../reducers/actions/documentActions";
import SearchBar from "../../components/searchBar/SearchBar";
import "./ReceivedSignature.scss";
import Column from "../../components/column/Column";

export interface document {
  _id: String;
  author: String;
  date: String;
  title: String;
}
export default function ReceivedSignature() {
  const dispatch = useDispatch();
  const documentsToSign: document[] = useSelector(
    (state: rootState) => state?.document?.payload
  );
  const handleSign = () => {
    return console.log("Handlesign");
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
            <h1>Inbox</h1>
          </div>
          <div className="received-signature-searchbar">
            <SearchBar />
          </div>
        </div>
        <div>
          <DetailedSign
            handleSign={handleSign}
            documentsToSign={documentsToSign}
          />
        </div>
      </div>
    </div>
  );
}

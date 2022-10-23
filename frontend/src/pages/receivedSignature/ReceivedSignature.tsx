import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailedSign from "../../components/detailedSign/DetailedSign";
import { rootState } from "../../reducers";
import { loadDocuments } from "../../reducers/actions/documentActions";
import SearchBar from "../../components/searchBar/SearchBar";
import "./ReceivedSignature.scss";
import Column from "../../components/column/Column";
import { Redirect } from "react-router-dom";
export interface document {
  _id: String;
  author: String;
  date: String;
  title: String;
}
export default function ReceivedSignature() {
  const dispatch = useDispatch();
  const documentsToSign: document[] = useSelector(
    (state: rootState) => state.document
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
          <h1 className="tab">Bandeja de entrada</h1>
          <SearchBar />
        </div>
        <div>
          <div className="info">
            <h2 className="h2">Documents to sign</h2>
            <h2 className="h2">1 - 50</h2>
          </div>
          <DetailedSign
            handleSign={handleSign}
            documentsToSign={documentsToSign}
          />
        </div>
      </div>
    </div>
  );
}

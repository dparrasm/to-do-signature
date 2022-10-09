import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailedSign from "../../components/detailedSign/DetailedSign";
import { rootState } from "../../reducers";
import { loadDocuments } from "../../reducers/actions/documentActions";
import "./ReceivedSignature.scss";

function handleSign() {
  return console.log("Handlesing");
}
export interface document {
  author: String;
  date: String;
  title: String;
}
export default function ReceivedSignature() {
  const dispatch = useDispatch();
  const documentsToSign: document[] = useSelector(
    (state: rootState) => state.document
  );
  useEffect(() => {
    dispatch(loadDocuments());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="info">
        <h2 className="h2">Documents to sign</h2>
        <h2 className="h2">1 - 50</h2>
      </div>
      <DetailedSign
        title="DOCUMENTO TEST 1"
        date="01/01/1999"
        handleSign={handleSign}
      ></DetailedSign>
      {documentsToSign.map((d, index) => (
        <DetailedSign
          key={index}
          title={d.title}
          date="01/01/1999"
          handleSign={handleSign}
        ></DetailedSign>
      ))}
    </div>
  );
}

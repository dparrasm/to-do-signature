import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailedSign from "../../components/detailedSign/DetailedSign";
import { rootState } from "../../reducers";
import { loadDocuments } from "../../reducers/actions/documentActions";
import SearchBar from "../../components/searchBar/SearchBar";
import "./ReceivedSignature.scss";

function handleSign() {
  return console.log("Handlesing");
}
export interface document {
  _id: String;
  author: String;
  date: String;
  title: String;
}
export default function ReceivedSignature() {
  const dispatch = useDispatch();
  // const [documentToSign, setDocumentToSign] = useState()
  const documentsToSign: document[] = useSelector(
    (state: rootState) => state.document
  );
  useEffect(() => {
    dispatch(loadDocuments());
  }, [dispatch]);

  return (
    <div>
      <SearchBar />

      <div className="container">
        <div className="info">
          <h2 className="h2">Documents to sign</h2>
          <h2 className="h2">1 - 50</h2>
        </div>
        {documentsToSign.map((d, index) => (
          <div>
            <DetailedSign
              key={index}
              id={d._id}
              title={d.title}
              date="01/01/1999"
              handleSign={handleSign}
            ></DetailedSign>
          </div>
        ))}
      </div>
    </div>
  );
}

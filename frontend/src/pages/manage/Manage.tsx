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
  lastChange: String;
  title: String;
}
export default function Manage(props) {
  const dispatch = useDispatch();
  const documents: document[] = useSelector(
    (state: rootState) => state?.document
  );
  const user = useSelector((state: rootState) => state?.auth?.user);

  const handleSign = () => {
    return console.log("Handlesign");
  };

  useEffect(() => {
    dispatch(loadDocuments(user.email));
  }, [dispatch]);
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
          <Envelope handleSign={handleSign} documents={documents} page={page} />
        </div>
      </div>
    </div>
  );
}

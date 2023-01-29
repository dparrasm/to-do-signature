import React, { useEffect } from "react";
import "./Column.scss";
import { icons } from "../../utils/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  unsearchDocuments,
  unselectDocuments,
} from "../../reducers/actions/documentActions";
import { rootState } from "../../reducers";

export default function Column() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const documents = useSelector((state: rootState) => state?.document);

  useEffect(() => {
    if (location.pathname.includes("/manage/")) {
      const folder = location.pathname.replace("/manage/", "");
      if (documents[folder].some((doc) => doc.isChecked === true)) {
        dispatch(unselectDocuments(folder));
      }
    }
  }, [location]);

  const handleClick = (page) => {
    history.push("/manage/" + page);
    dispatch(unsearchDocuments());
  };
  return (
    <div className="container">
      <div className="column-list">
        <div>
          <Link to="/prepare">
            <button className="column-start-to-prepare-envelope-button">
              START
            </button>
          </Link>
        </div>
        <div className="envelopes">
          <h4>Envelopes</h4>
          <div
            className="column-menu-option"
            onClick={() => handleClick("inbox")}
          >
            <div className={icons.received}></div>
            <div>Inbox</div>
          </div>
          <div
            className="column-menu-option"
            onClick={() => handleClick("sent")}
          >
            <div className={icons.send}></div>
            <div>Sent</div>
          </div>
        </div>
      </div>
    </div>
  );
}

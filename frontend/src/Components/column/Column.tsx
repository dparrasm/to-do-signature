import React, { useEffect } from "react";
import "./Column.scss";
import { icons } from "../../utils/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  unsearchDocuments,
  unselectDocuments,
} from "../../reducers/actions/documentActions";

export default function Column() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const folder = location.pathname.replace("/manage/", "");
    dispatch(unselectDocuments(folder));
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

import React, { useEffect } from "react";
import "./Column.scss";
import { icons } from "../../utils/icons";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unselectDocuments } from "../../reducers/actions/documentActions";

export default function Column() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const folder = location.pathname.replace("/manage/", "");
    dispatch(unselectDocuments(folder));
  }, [location]);

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
          <Link className="column-menu-option" to="/manage/inbox">
            <div className={icons.received}></div>
            <div>Inbox</div>
          </Link>
          <Link className="column-menu-option" to="/manage/sent">
            <div className={icons.send}></div>
            <div>Sent</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

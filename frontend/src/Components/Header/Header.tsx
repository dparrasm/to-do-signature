import React from "react";
import { Link, useLocation } from "react-router-dom";
import { icons } from "../../utils/icons";
import IconButton from "../iconButton/IconButton";
import "../../comun.scss";
import "./Header.scss";

export default function Header(props) {
  const logout = () => {
    props.onUserLogOut();
  };
  const location = useLocation();

  return (
    <div>
      <div className="header-app-bar">
        <div className="header-tool-bar">
          <div className="header-icon-container">
            <div>
              <h1 className="firma-title header">firm@</h1>
            </div>
          </div>
          <ul className="header-icon-bar">
            <li
              className={
                location.pathname.includes("home")
                  ? "header-icon-bar-element-selected"
                  : "header-icon-bar-element"
              }
            >
              <Link className="header-bar-link" to="/home">
                Home
              </Link>
            </li>
            <li
              className={
                location.pathname.includes("manage")
                  ? "header-icon-bar-element-selected"
                  : "header-icon-bar-element"
              }
            >
              <Link className="header-bar-link" to="/manage">
                Manage
              </Link>
            </li>
            <li
              className={
                location.pathname.includes("profile")
                  ? "header-icon-bar-element-selected"
                  : "header-icon-bar-element"
              }
            >
              <Link className="header-bar-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="header-icon-bar-element" onClick={logout}>
              <div className="header-logout-link-container">
                <Link to="/" className="header-bar-link">
                  <div className="header-logout-link">
                    <div className={icons.logout} />
                    <span>Logout</span>
                  </div>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

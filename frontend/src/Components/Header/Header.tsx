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
            <li className="header-icon-bar-element">
              <Link
                className={
                  location.pathname.includes("home")
                    ? "header-bar-link-selected"
                    : "header-bar-link"
                }
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="header-icon-bar-element">
              <Link
                className={
                  location.pathname.includes("manage")
                    ? "header-bar-link-selected"
                    : "header-bar-link"
                }
                to="/manage"
              >
                Manage
              </Link>
            </li>
            <li className="header-icon-bar-element">
              <Link
                className={
                  location.pathname.includes("profile")
                    ? "header-bar-link-selected"
                    : "header-bar-link"
                }
                to="/profile"
              >
                Profile
              </Link>
            </li>
            <li onClick={logout}>
              <div className="header-logout-container ">
                <Link to="/" className="header-bar-link">
                  <IconButton icon={icons.logout} text="Logout" />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

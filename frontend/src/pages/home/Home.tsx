import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { rootState } from "../../reducers";
import DragAndDrop from "../../components/dragAndDrop/DragAndDrop";
import React from "react";
import "./Home.scss";

export interface User {
  name: String;
  surname: String;
  email: String;
  avatar: String;
}
export default function Home() {
  const user: any = useSelector((state: rootState) => state?.auth?.user);
  return (
    <div className="home-container">
      <div className="home-user">
        <div className="home-user-info">
          <Avatar
            className="user-profile-avatar"
            style={{ height: "100px", width: "100px" }}
            alt="David Parras"
            src={user?.avatar}
          />
          <div className="user-required-data-actions-container">
            <div className="user-required-data">
              <h1>
                {user.name} {user.surname}
              </h1>
            </div>
            <div className="user-actions-required-container">
              <div className="user-actions-required">
                <div className="user-actions-required-number">0</div>
                <div className="user-actions-required-name">Signed by</div>
              </div>
              <div className="user-actions-required">
                <div className="user-actions-required-number">0</div>
                <div className="user-actions-required-name">
                  Action required
                </div>
              </div>
              <div className="user-actions-required">
                <div className="user-actions-required-number">0</div>
                <div className="user-actions-required-name">
                  Waiting for others
                </div>
              </div>
              <div className="user-actions-required">
                <div className="user-actions-required-number">0</div>
                <div className="user-actions-required-name">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-drag-and-drop-container">
        <div className="home-drag-and-drop">
          <DragAndDrop title="START NOW" />
        </div>
      </div>
    </div>
  );
}

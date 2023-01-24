import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../reducers";
import DragAndDrop from "../../components/dragAndDrop/DragAndDrop";
import React, { useEffect, useMemo, useState } from "react";
import "./Home.scss";
import { loadDocuments } from "../../reducers/actions/documentActions";
import { Link } from "react-router-dom";

export interface User {
  name: String;
  surname: String;
  email: String;
  avatar: String;
}
export default function Home() {
  const user: any = useSelector((state: rootState) => state?.auth?.user);
  const dispatch = useDispatch();
  dispatch(loadDocuments(user?.email));
  const documents: any = useSelector((state: rootState) => state?.document);
  const [notification, setNotifications] = useState({
    actionRequired: 0,
    waitingForOthers: 0,
    signedBy: 0,
    completed: 0,
  });
  const documentsJsonString = JSON.stringify(documents);
  const updateUserInformation = () => {
    let allDocuments = [
      ...new Set([...documents["sent"], ...documents["inbox"]]),
    ];
    let counters = {
      actionRequiredCont: 0,
      waitingForOthersCont: 0,
      signedByCont: 0,
      completedCont: 0,
    };
    allDocuments.map((d) => {
      if (
        d.recipients.filter(
          (r) => r?.email === user?.email && (!r?.signed || !r?.viewed)
        ).length > 0
      ) {
        counters.actionRequiredCont++;
      }
      if (
        d.recipients.filter(
          (r) => r?.email !== user?.email && (!r?.signed || !r?.viewed)
        ).length > 0
      ) {
        counters.waitingForOthersCont++;
      }
      if (d.recipients.every((r) => r?.signed && r?.viewed)) {
        counters.completedCont++;
      }
      if (
        d.recipients.filter((r) => r?.email === user?.email && r.signed)
          .length > 0
      ) {
        counters.signedByCont++;
      }
    });
    setNotifications({
      actionRequired: counters.actionRequiredCont,
      waitingForOthers: counters.waitingForOthersCont,
      signedBy: counters.signedByCont,
      completed: counters.completedCont,
    });
  };

  useEffect(() => {
    setTimeout(() => {}, 5000);
    updateUserInformation();
  }, [documentsJsonString]);
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
                {user?.name} {user?.surname}
              </h1>
            </div>
            <div className="user-actions-required-container">
              <div className="user-actions-required">
                <div className="user-actions-required-number">
                  {notification.signedBy}
                </div>
                <div className="user-actions-required-name">Signed by</div>
              </div>
              <div className="user-actions-required">
                <div className="user-actions-required-number">
                  {notification.actionRequired}
                </div>
                <div className="user-actions-required-name">
                  Action required
                </div>
              </div>
              <div className="user-actions-required">
                <div className="user-actions-required-number">
                  {notification.waitingForOthers}
                </div>
                <div className="user-actions-required-name">
                  Waiting for others
                </div>
              </div>
              <div className="user-actions-required">
                <div className="user-actions-required-number">
                  {notification.completed}
                </div>
                <div className="user-actions-required-name">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/prepare">
        <div className="home-drag-and-drop-container">
          <div className="home-drag-and-drop">
            <DragAndDrop title="START NOW" />
          </div>
        </div>
      </Link>
    </div>
  );
}

import { Avatar } from "@material-ui/core";
import React from "react";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-user">
        <div className="home-user-info">
          <Avatar
            className="user-profile-avatar"
            style={{ height: "100px", width: "100px" }}
            alt="David Parras"
            src="https://media-exp1.licdn.com/dms/image/C4E03AQGIPtFR0gW_OA/profile-displayphoto-shrink_200_200/0/1655662219968?e=2147483647&v=beta&t=m0fmDDT5S8KYJprxDDEyXpktbNyke-i8Y4OueJvkuK4"
            //src="https://media-exp1.licdn.com/dms/image/C4D03AQGJFg1CxBNtTA/profile-displayphoto-shrink_200_200/0/1659604576961?e=2147483647&v=beta&t=FlxXD-qaVrsT2zf2rVIlkR51tJchoPTiozLaM8JTa0E"
          />
          <div className="user-actions-required">
            <div className="user-actions-required-number">0</div>
            <div className="user-actions-required-name">Signed by</div>
          </div>
          <div className="user-actions-required">
            <div className="user-actions-required-number">0</div>
            <div className="user-actions-required-name">Action required</div>
          </div>
          <div className="user-actions-required">
            <div className="user-actions-required-number">0</div>
            <div className="user-actions-required-name">Waiting for others</div>
          </div>
          <div className="user-actions-required">
            <div className="user-actions-required-number">0</div>
            <div className="user-actions-required-name">Completed</div>
          </div>
        </div>
      </div>
      <div className="drag-and-drop-container">
        <div className="drag-and-drop">
          <div className="fake">
            <button>Fake drag and drop</button>
          </div>
        </div>
      </div>
    </div>
  );
}

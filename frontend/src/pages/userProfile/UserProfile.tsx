import { Button, TextField, Badge, Avatar } from "@material-ui/core";
import React from "react";
import "./UserProfile.scss";
import Filepicker from "../../components/filepicker/Filepicker";
import { rootState } from "../../reducers";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const user = useSelector((state: rootState) => state.auth?.user);

  const updateUser = async (event) => {
    console.log("Updating user..");
    //Aquí iría el dispatch
  };

  return (
    <div className="user-container">
      <div className="user-container-info">
        <div className="title">
          <h1>Profile picture</h1>
        </div>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Filepicker user={user} accept="image/*" multiple={false} />
          }
        >
          <Avatar
            className="user-profile-avatar"
            style={{ height: "200px", width: "200px" }}
            alt="David Parras"
            src={user ? user.avatar : ""}
          />
        </Badge>
      </div>
      <div className="user-security-data-container">
        <div className="title">
          <h1>Credentials</h1>
        </div>
        <div className="user-security-data">
          <div className="username">
            <TextField
              name="name"
              className="smallField"
              type="text"
              placeholder="Name"
              variant="outlined"
              size="small"
              value={user.name}
            />
            <TextField
              name="surname"
              className="small-field-no-margin"
              type="text"
              placeholder="Surname"
              variant="outlined"
              size="small"
              value={user.surname}
            />
          </div>
          <div className="user-security-data-big-fields">
            <TextField
              name="email"
              className="field"
              type="text"
              placeholder="Email"
              variant="outlined"
              size="small"
              value={user.email}
            />
            <TextField
              name="password"
              className="field"
              type="password"
              placeholder="password"
              variant="outlined"
              size="small"
              value="1234"
            />
          </div>
        </div>
      </div>
      <div className="button-actions">
        <Button
          className="button"
          variant="contained"
          color="primary"
          onClick={updateUser}
        >
          Update
        </Button>
        <Button
          className="red-button"
          variant="contained"
          color="primary"
          onClick={updateUser}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

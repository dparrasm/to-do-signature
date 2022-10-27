import { Button, TextField, Badge, Avatar } from "@material-ui/core";
import React from "react";
import "./UserProfile.scss";
import Filepicker from "../../components/searchBar/filepicker/Filepicker";
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
      <div className="profile-picture">
        <div className="title">Profile picture</div>
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
      <div className="user">
        <div className="username">
          <TextField
            name="name"
            className="field"
            type="text"
            placeholder="Name"
            variant="outlined"
            size="small"
          />
          <div className="separator" />
          <TextField
            name="surname"
            className="field"
            type="text"
            placeholder="Surname"
            variant="outlined"
            size="small"
          />
        </div>
        <TextField
          name="email"
          className="field"
          type="text"
          placeholder="Email"
          variant="outlined"
          size="small"
        />
        <TextField
          name="password"
          className="field"
          type="password"
          placeholder="password"
          variant="outlined"
          size="small"
        />
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

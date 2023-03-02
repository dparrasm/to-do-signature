import { Button, Badge, Avatar } from "@material-ui/core";
import React, { useRef, useState } from "react";
import "./UserProfile.scss";
import Filepicker from "../../components/filepicker/Filepicker";
import { rootState } from "../../reducers";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  logout,
  updateUser,
} from "../../reducers/actions/authActions";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const user = useSelector((state: rootState) => state.auth?.user);
  const [avatar, setAvatar] = useState(user?.avatar);
  const dispatch = useDispatch();

  const name = useRef<HTMLInputElement>(null);
  const surname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    try {
      dispatch(deleteUser());
      dispatch(logout());
    } catch (err: any) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => console.log(error.msg, "error"));
      }
    }
  };
  const handleOnClick = () => {
    const newUser = {
      name: name?.current?.value ? name.current.value : user.name,
      surname: surname?.current?.value ? surname.current.value : user.surname,
      email: user.email,
      avatar: avatar,
      password:
        password?.current?.value !== "password"
          ? password?.current?.value
          : user.password,
    };
    if (JSON.stringify(user) !== JSON.stringify(newUser)) {
      dispatch(updateUser(newUser));
    }
  };

  const updateProfilePicture = (profilePicture) => {
    setAvatar(profilePicture);
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
            <Filepicker
              user={user}
              accept="image/*"
              multiple={false}
              updateProfilePicture={updateProfilePicture}
            />
          }
        >
          <Avatar
            className="user-profile-avatar"
            style={{ height: "200px", width: "200px" }}
            alt="David Parras"
            src={avatar}
          />
        </Badge>
      </div>

      <div className="user-security-data-container">
        <div className="title">
          <h1>Credentials</h1>
        </div>
        <div className="user-security-data">
          <div className="user-security-data-big-fields">
            <div className="two-fields">
              <input
                name="name"
                ref={name}
                className="smallField"
                type="text"
                placeholder="Name"
                defaultValue={user?.name}
              />
              <input
                name="surname"
                ref={surname}
                className="small-field-no-margin"
                type="text"
                placeholder="Surname"
                defaultValue={user?.surname}
              />
            </div>
            <input
              name="email"
              ref={email}
              className="field"
              type="text"
              placeholder="Email"
              value={user?.email}
              readOnly={true}
            />
            <input
              name="password"
              ref={password}
              className="field"
              type="password"
              placeholder="Password"
              defaultValue="password"
            />
          </div>
        </div>
      </div>
      <div className="button-actions">
        <Button
          className="button"
          variant="contained"
          color="primary"
          onClick={handleOnClick}
        >
          Update
        </Button>
        <Link to="/login">
          <Button
            className="red-button"
            variant="contained"
            color="primary"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Link>
      </div>
    </div>
  );
}

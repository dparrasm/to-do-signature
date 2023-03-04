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
import Column from "../../components/column/Column";
import { icons } from "../../utils/icons";

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
  const userMenu = () => {
    return (
      <div className="user-profile-menu">
        <div className="user-profile-menu-options">
          <h1>Account</h1>
          <div className="user-profile-menu-option-selected">
            <div className={icons.user} />
            <div>Profile</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="user-profile-layout">
      {userMenu()}
      <div className="user-profile-data-layout">
        <div className="user-container">
          <div className="user-container-info">
            <div className="user-profile-title">
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
            <div className="user-profile-title">
              <h1>My Credentials</h1>
            </div>
            <div className="user-security-data">
              <div className="user-security-data-big-fields">
                <div>
                  <div className="user-profile-form-field">
                    Name
                    <input
                      name="name"
                      ref={name}
                      className="field"
                      type="text"
                      placeholder="Name"
                      defaultValue={user?.name}
                    />
                  </div>
                  <div className="user-profile-form-field">
                    Surname
                    <input
                      name="surname"
                      ref={surname}
                      className="field"
                      type="text"
                      placeholder="Surname"
                      defaultValue={user?.surname}
                    />
                  </div>
                </div>
                <div>
                  <div className="user-profile-form-field">
                    Email
                    <input
                      name="email"
                      ref={email}
                      className="field"
                      type="text"
                      placeholder="Email"
                      value={user?.email}
                      readOnly={true}
                    />
                  </div>
                  <div className="user-profile-form-field">
                    Password
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
            </div>
          </div>
        </div>
        <div className="button-actions">
          <Button
            className="user-profile-button"
            variant="contained"
            color="primary"
            onClick={handleOnClick}
          >
            Update
          </Button>
          <Link to="/login">
            <Button
              className="user-profile-inversed-button"
              variant="contained"
              color="primary"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

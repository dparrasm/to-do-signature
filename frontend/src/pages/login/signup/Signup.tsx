import { Button, TextField } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import React, { useRef, useState } from "react";
import "./Signup.scss";
import { icons } from "../../../utils/icons";
import { useDispatch } from "react-redux";
import IconButton from "../../../components/iconButton/IconButton";
import {
  passwordResetRequest,
  register,
} from "../../../reducers/actions/authActions";
import { UserSignUp } from "../../../domain/user";

interface SignupProps {
  shouldOpenModal: boolean;
  handleClose: () => void;
  register?: any;
  caller?: string | null;
}

export const Signup = (props: SignupProps) => {
  const [user, setUser] = useState<UserSignUp>({
    name: "",
    surname: "",
    emailAddress: "",
    password: "",
  });

  // const { name, surname, emailAddress, password } = user;
  const dispatch = useDispatch();
  const emailInput = useRef<HTMLInputElement>(null);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onUserSignup = async (event) => {
    event.preventDefault();
    dispatch(register(user));
    props.handleClose();
  };

  const onUserPasswordRequest = () => {
    const value = emailInput?.current?.value;
    console.log(value);
    if (value !== undefined) {
      dispatch(passwordResetRequest(value));
    }
    props.handleClose();
  };

  return (
    <Dialog open={props.shouldOpenModal}>
      <div className="signup-user-form">
        <div className="signup-form-title">
          <div className="firma-title modal">firm@</div>
          <div className="close-button" onClick={props.handleClose}>
            <IconButton icon={icons.closeIcon} />
          </div>
        </div>
        {props.caller === "signup" ? (
          <div>
            <div className="signup-form-message">
              Regístrate para jugar con tus firmitas
            </div>
            <div className="signup-form-field">
              <TextField
                name="name"
                type="text"
                placeholder="Name"
                variant="outlined"
                size="small"
                onChange={handleInputChange}
              />
            </div>
            <div className="signup-form-field">
              <TextField
                name="surname"
                type="text"
                placeholder="Surname"
                variant="outlined"
                size="small"
                onChange={handleInputChange}
              />
            </div>
            <div className="signup-form-field">
              <TextField
                name="email"
                type="text"
                placeholder="Email"
                variant="outlined"
                size="small"
                onChange={handleInputChange}
              />
            </div>
            <div className="signup-form-field">
              <TextField
                name="password"
                type="password"
                placeholder="password"
                variant="outlined"
                size="small"
                onChange={handleInputChange}
              />
            </div>
            <div className="signup-form-button">
              <Button
                className="button"
                variant="contained"
                color="primary"
                onClick={onUserSignup}
              >
                Sign up
              </Button>
            </div>
          </div>
        ) : (
          <div className="signup-user-form">
            <div className="signup-form-message">
              You forgot your password ?
            </div>
            <div className="signup-form-field">
              <input
                ref={emailInput}
                name="email"
                className="field"
                type="text"
                placeholder="Email"
                defaultValue=""
              />
            </div>
            <div className="send-new-password-button-container">
              <Button
                className="send-new-password-button"
                variant="contained"
                color="primary"
                onClick={onUserPasswordRequest}
              >
                Send new password
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

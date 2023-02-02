import { Button, TextField } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import React, { useRef } from "react";
import "./Signup.scss";
import { icons } from "../../../utils/icons";
import { useDispatch } from "react-redux";
import IconButton from "../../../components/iconButton/IconButton";
import {
  passwordResetRequest,
  register,
} from "../../../reducers/actions/authActions";

interface SignupProps {
  shouldOpenModal: boolean;
  handleClose: () => any;
  register?: any;
  caller: string;
}

export const Signup = (props: SignupProps) => {
  const [user, setUser] = React.useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const { name, surname, email, password } = user;
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
    dispatch(register({ name, surname, email, password }));
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
      <div className="user-container">
        <div className="title">
          <div className="firma-title modal">firm@</div>
          <div className="close-button" onClick={props.handleClose}>
            <IconButton icon={icons.closeIcon} />
          </div>
        </div>
        {props.caller === "signup" ? (
          <div>
            <div className="message">
              Regístrate para jugar con tus firmitas
            </div>
            <div className="username">
              <TextField
                name="name"
                className="field"
                type="text"
                placeholder="Name"
                variant="outlined"
                size="small"
                onChange={handleInputChange}
              />
              <div className="separator" />
              <TextField
                name="surname"
                className="field"
                type="text"
                placeholder="Surname"
                variant="outlined"
                size="small"
                onChange={handleInputChange}
              />
            </div>
            <TextField
              name="email"
              className="field"
              type="text"
              placeholder="Email"
              variant="outlined"
              size="small"
              onChange={handleInputChange}
            />
            <TextField
              name="password"
              className="field"
              type="password"
              placeholder="password"
              variant="outlined"
              size="small"
              onChange={handleInputChange}
            />
            <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={onUserSignup}
            >
              Sign up
            </Button>
          </div>
        ) : (
          <div>
            <div className="message">You forgot your password ?</div>
            <input
              ref={emailInput}
              name="email"
              className="field"
              type="text"
              placeholder="Email"
              defaultValue=""
            />
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

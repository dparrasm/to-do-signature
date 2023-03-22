import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Signup } from "./signup/Signup";
import { useDispatch } from "react-redux";
import Alert from "../../components/alert/Alert";
import { login } from "../../reducers/actions/authActions";
import "./Login.scss";
import { icons } from "../../utils/icons";
import { UserLogin } from "../../domain/user";

export enum Caller {
  forgotpasword = "forgotpassword",
  signup = "signup",
}

export default function Login() {
  const [user, setUser] = useState<UserLogin>({
    emailAddress: "",
    password: "",
  });
  const [isModalOpen, openModal] = useState(false);
  const [caller, setCaller] = useState<Caller | null>(null);

  const dispatch = useDispatch();
  const handleCaller = (param: Caller) => {
    setCaller(param);
    openModal(true);
  };
  const handleInputChange = (e): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = (): void => {
    openModal(false);
  };

  const onUserLogin = (event): void => {
    event.preventDefault();
    dispatch(login(user.emailAddress, user.password));
  };

  return (
    <div className="login-schema">
      <div className="login-container">
        <div className="login-cockpit"></div>
        <div className="login">
          <div className="login-form-layout">
            <h2 className="login-description">
              All your signatures on the same platform
            </h2>
            <Alert className="login-alert" />
            <div className="login-form">
              <div>
                <h1 id="logo-firma" className="firma-title main">
                  Firm@
                </h1>
              </div>
              <form className="login-form-fields">
                <TextField
                  name="emailAddress"
                  className="textfield"
                  type="text"
                  placeholder="Email"
                  variant="outlined"
                  size="small"
                  onChange={handleInputChange}
                />
                <TextField
                  name="password"
                  className="textfield"
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                  size="small"
                  onChange={handleInputChange}
                />
                <div className="login-forgot-password">
                  <Button
                    className="login-password-link"
                    onClick={() => handleCaller(Caller.forgotpasword)}
                  >
                    Forgot Password ?
                  </Button>
                </div>
                <div className="login-link-container">
                  <Button
                    className="login-button"
                    variant="contained"
                    color="primary"
                    onClick={onUserLogin}
                  >
                    Log In
                  </Button>
                  <Button
                    className="login-link"
                    variant="contained"
                    color="primary"
                    onClick={() => handleCaller(Caller.signup)}
                  >
                    Sign Up
                  </Button>
                  <Signup
                    shouldOpenModal={isModalOpen}
                    caller={caller}
                    handleClose={handleClose}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="login-footer">
        <div className="login-footer-info">
          <div className="login-footer-author">
            Designed and developed by David Parras Martínez
            <div className="login-footer-contact-me">
              <div>
                <div className="login-logo-linkedin">
                  <i className={icons.linkedin} />
                  <a href="https://www.linkedin.com/in/dparrasm/">Linkedin</a>
                </div>
              </div>
              <div>
                <div className="login-logo-github">
                  <i className={icons.github} />
                  <a href="https://github.com/dparrasm?tab=repositories">
                    Github
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

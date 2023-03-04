import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Signup } from "./signup/Signup";
import { useDispatch } from "react-redux";
import { setAlert } from "../../reducers/actions/alertActions";
import Alert from "../../components/alert/Alert";
import { login } from "../../reducers/actions/authActions";
import "./Login.scss";
import { icons } from "../../utils/icons";

interface LoginProps {
  onUserLogIn?: any;
  isAuthenticated?: boolean;
}

export default function Login(props: LoginProps) {
  const [caller, setCaller] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });
  const [isModalOpen, openModal] = useState(false);
  const dispatch = useDispatch();
  const hanldeCaller = (param: string) => {
    setCaller(param);
    openModal(true);
  };
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleOpen = () => {
    openModal(true);
  };
  const handleClose = () => {
    openModal(false);
  };

  const onUserLogin = (event) => {
    event.preventDefault();
    dispatch(login(user.email, user.password));
  };

  //Redirect if logged in
  //Aquí es donde hacemos que no se salga el usuario de la página todo el rato.
  // if (this.props.isAuthenticated && !this.props.loading) {
  //   this.props.onUserLogIn();
  // }
  return (
    <div className="login-schema">
      <div className="login-container">
        <div className="login-cockpit">
          <h1 id="logo-firma" className="firma-title main">
            Firm@
          </h1>
          <h2 className="login-description">
            All your signatures on the same platform
          </h2>
        </div>
        <div className="login">
          <div className="login-form-layout">
            <Alert className="login-alert" />
            <div className="login-form">
              <form className="login-form-fields">
                <TextField
                  name="email"
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
                <Button
                  className="login-button"
                  variant="contained"
                  color="primary"
                  onClick={onUserLogin}
                >
                  Log In
                </Button>
                <div className="login-forgot-password">
                  <Button
                    className="login-password-link"
                    onClick={() => hanldeCaller("forgotpasword")}
                  >
                    Forgot Password ?
                  </Button>
                </div>
                <div className="login-link-container">
                  <Button
                    className="login-link"
                    variant="contained"
                    color="primary"
                    onClick={() => hanldeCaller("signup")}
                  >
                    Create New Account
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

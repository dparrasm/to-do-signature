import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import Signup from "./signup/Signup";
import { connect, ConnectedProps } from "react-redux";
import { setAlert } from "../../reducers/actions/alertActions";
import Alert from "../../components/alert/Alert";
import { login } from "../../reducers/actions/authActions";

interface LoginProps {
  classes?: any;
  onUserLogIn?: any;
  login: any;
  isAuthenticated?: boolean;
  loading: boolean;
}
interface LoginState {
  isModalOpen: boolean;
  user: any;
}
const styles = {
  schema: {
    display: "flex",
    height: "100%",
    flexDirection: "column" as "column",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "150px",
    marginBottom: "250px",
    fontFamily: "Robotica",
    height: "120%",
  },
  cockpit: {
    width: "20%",
    marginRight: "90px",
    minWidth: "240px",
  },
  login: {
    display: "flex",
    height: "100%",
    width: "30%",
  },
  description: {
    width: "400px",
    height: "100px",
    position: "absolute" as "absolute",
    fontFamily: "Roboto",
  },
  link: {
    backgroundColor: "#36a420",
    marginTop: "15px",
  },
  button: {
    backgroundColor: "#166fe5",
    marginTop: "10px",
    width: "85%",
  },
  footer: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    textAlign: "center" as "center",
    color: "grey",
    fontFamily: "Roboto",
    fontSize: "13px",
    borderColor: "#e0e0de",
    borderStyle: "solid" as "solid",
    borderWidth: "1px",
  },
  footerInfo: {
    marginTop: "20px",
  },
  formLayout: {
    marginLeft: "100px",
  },
  alert: {
    marginBottom: "10px",
    position: "relative" as "relative",
  },
  form: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "10px",
    minWidth: "300px",
    maxWidth: "350px",
    boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
    minHeight: "300px",
  },
  formFields: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as "column",
  },
  textField: {
    marginTop: "20px",
    width: "85%",
  },
  passwordLink: {
    color: "#166fe5",
    fontFamily: "Roboto",
    fontWeight: "bolder" as "bolder",
    fontSize: "smaller",
    marginTop: "20px",
    textDecoration: "none" as "none",
  },
  linkContainer: {
    marginTop: "8px",
    borderTopStyle: "solid" as "solid",
    borderWidth: "1px",
    borderColor: "#e0e0de",
    width: "85%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

class Login extends Component<
  LoginProps & ConnectedProps<typeof connector>,
  LoginState
> {
  constructor(props: LoginProps & ConnectedProps<typeof connector>) {
    super(props);

    this.state = {
      isModalOpen: false,
      user: {
        name: "",
        surname: "",
        email: "",
        password: "",
      },
    };
  }

  handleInputChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleOpen = () => {
    this.setState({ isModalOpen: true });
  };
  handleClose = () => {
    this.setState({ isModalOpen: false });
  };

  onUserLogin = (event) => {
    event.preventDefault();
    this.props.login(this.state.user.email, this.state.user.password);
  };
  render() {
    const { classes } = this.props;

    //Redirect if logged in
    //Aquí es donde hacemos que no se salga el usuario de la página todo el rato.
    if (this.props.isAuthenticated && !this.props.loading) {
      this.props.onUserLogIn();
    }
    return (
      <div className={classes.schema}>
        <div className={classes.container}>
          <div className={classes.cockpit}>
            <h1 className="firma-title main">Firm@</h1>
            <h2 className={classes.description}>
              All your signatures on the same platform
            </h2>
          </div>
          <div className={classes.login}>
            <div className={classes.formLayout}>
              <Alert className={classes.alert} />
              <div className={classes.form}>
                <form className={classes.formFields}>
                  <TextField
                    name="email"
                    className={classes.textField}
                    type="text"
                    placeholder="Email"
                    variant="outlined"
                    size="small"
                    onChange={this.handleInputChange}
                  />
                  <TextField
                    name="password"
                    className={classes.textField}
                    type="password"
                    placeholder="Password"
                    variant="outlined"
                    size="small"
                    onChange={this.handleInputChange}
                  />
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={this.onUserLogin}
                  >
                    Log In
                  </Button>
                  <a
                    className={classes.passwordLink}
                    target="_blank"
                    href="https://smallbiztrends.com/2015/02/ways-to-remember-passwords.html"
                  >
                    Forgot Password ?
                  </a>
                  <div className={classes.linkContainer}>
                    <Button
                      className={classes.link}
                      variant="contained"
                      color="primary"
                      onClick={this.handleOpen}
                    >
                      Create New Account
                    </Button>
                    <Signup
                      shouldOpenModal={this.state.isModalOpen}
                      handleClose={this.handleClose}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerInfo}>
            Español (España) Français (France) English (US) Türkçe Português
            (Portugal) العربية Italiano Deutsch हिन्दी中文(简体) 日本語
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

const connector = connect(mapStateToProps, { setAlert, login });
export default connector(withStyles(styles)(Login));

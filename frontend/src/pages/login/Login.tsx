import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import Signup from "./signup/Signup";
import { connect, ConnectedProps } from "react-redux";
import { setAlert } from "../../reducers/actions/alertActions";
import Alert from "../../components/alert/Alert";
import { UserModel } from "../../components/user/UserModel";

interface LoginProps {
  classes?: any;
  onUserLogIn?: any;
}
interface LoginState {
  message: string;
  isModalOpen: boolean;
  user: UserModel;
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
    marginTop: "-20px",
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
  title: {
    fontSize: "xxx-large",
    fontStyle: "normal",
    color: "#1877f2",
    fontFamily: "Roboto",
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
  h2: {
    color: "#166fe5",
    fontFamily: "Roboto",
    fontWeight: "bolder" as "bolder",
    fontSize: "smaller",
    marginTop: "20px",
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
      message: "Loading...",
      isModalOpen: false,
      user: {
        name: "",
        surname: "",
        email: "",
        password: "",
      },
    };
  }
  componentDidMount(){

  };
  
  handleInputChange = (e) => {
    console.log(e.target.value, " is my LOGIN value");
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
    fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        email: this.state.user.email,
        password: this.state.user.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Login de puta madre");
          this.props?.onUserLogIn();
        } else {
          this.props.setAlert("Invalid credentials", "error");
        }
      })
      .catch((err) => {
        console.error(err.errmsg);
        alert("Error login");
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.schema}>
        <div className={classes.container}>
          <div className={classes.cockpit}>
            <h1 className={classes.title}>firm@</h1>
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
                  <h2 className={classes.h2}>Forgot Password ?</h2>
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

const connector = connect(null, { setAlert });
export default connector(withStyles(styles)(Login));

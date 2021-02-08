import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import DynamicForm, { formFields } from "../DynamicForm";
import Logo from "../../loginSignature.jpeg";
import { FullscreenExit, Height } from "@material-ui/icons";
import { Button, TextField } from "@material-ui/core";

interface LoginProps {
  classes?: any;
  onUserLogIn?: any;
}

const styles = {
  schema: {
    display: "flex",
    height: "100%",
    flexDirection: "column" as "column"
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "150px",
    marginBottom: "250px",
    fontFamily: "Robotica",
    height: "120%"
  },
  cockpit: {
    width: "20%",
    marginRight: "90px",
    minWidth: "240px"
  },
  login: {
    display: "flex",
    height: "100%",
    width: "30%"
  },
  description: {
    width: "400px",
    height: "100px",
    position: "absolute" as 'absolute',
    marginTop: "-20px",
    fontFamily: "Roboto"
  },
  link: {
    backgroundColor: "#36a420",
    marginTop: "15px"
  },
  button: {
    backgroundColor: "#166fe5",
    marginTop: "10px",
    width: "85%"
  },
  title: {
    fontSize: "xxx-large",
    fontStyle: "normal",
    color: "#1877f2",
    fontFamily: "Roboto"
  },
  footer: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    textAlign: "center" as "center",
    color: "grey",
    fontFamily: "Roboto",
    fontSize: "13px",
    borderColor: '#e0e0de',
    borderStyle: 'solid' as 'solid',
    borderWidth: '1px'
  },
  footerInfo: {
    marginTop: "20px"

  },
  form: {
    width: "100%",
    backgroundColor: "white",
    marginLeft: "100px",
    borderRadius: "10px",
    minWidth: "300px",
    maxWidth: "350px",
    boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)"
  },
  formFields: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as "column"
  },
  textField: {
    marginTop: "20px",
    width:"85%"
  },
  h2: {
    color: "#166fe5",
    fontFamily: 'Roboto',
    fontWeight: "bolder" as "bolder",
    fontSize: "smaller",
    marginTop: "20px"
  },
  linkContainer: {
    marginTop: "8px",
    borderTopStyle: "solid" as "solid",
    borderWidth: "1px",
    borderColor: '#e0e0de',
    width: "85%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

class Login extends Component<LoginProps, any> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      message: "Loading..."
    };
  }

  componentDidMount() {
    //GET message from server using fetch api
    fetch("/api/home", {
      method: "get",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*"
      })
    })
      .then((res) => res.text())
      .then((res) => this.setState({ message: res }));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.schema}>
        <div className={classes.container}>
          <div className={classes.cockpit}>
            <h1 className={classes.title}>firm@</h1>
            <h2 className={classes.description}>All your signatures on the same platform</h2>
          </div>
          <div className={classes.login}>
            <div className={classes.form}>
            <form className={classes.formFields}>
              <TextField
                className={classes.textField}
                type="text"
                placeholder="Username"
                variant="outlined"
                size="small"
              />
              <TextField
                className={classes.textField}
                type="text"
                placeholder="Password"
                variant="outlined"
                size="small"
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={
                  this.props?.onUserLogIn || console.log("Submit clicked!")
                }
              >
                Log In
              </Button>
              <h2 className={classes.h2}>Forgot Password ?</h2>
              <div className={classes.linkContainer}>
              <Button
                className={classes.link}
                variant="contained"
                color="primary"
              >
                Create New Account
              </Button>
              </div>
            </form>
            </div>


          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerInfo}>
            Español (España)  Français (France)  English (US)  Türkçe  Português (Portugal)  العربية  Italiano  Deutsch  हिन्दी中文(简体)  日本語
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);

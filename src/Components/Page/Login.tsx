import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import DynamicForm, { formFields } from "../DynamicForm";
import Logo from "../../loginSignature.jpeg";

const loginForm: formFields[] = [
  {
    id: "123asd",
    label: "Username",
    type: "text",
    placeholder: "Username..",
    helperText: "true"
  },
  { id: "123asf", label: "Password", type: "password", placeholder: "Password" }
];

interface LoginProps {
  classes?: any;
  onUserLogIn?: any;
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "150px",
    marginBottom: "250px",
    fontFamily: "Robotica"
  },
  cockpit: {
    width: "20%",
    marginRight: "90px"
  },
  login: {
    marginTop: "30px",
    height: "200px",
    borderRadius: "25%",
    width: "25%"
  },
  description: {
    width: "400px",
    height: "100px",
    position: "absolute" as 'absolute',
    marginTop: "-20px",
    fontFamily: "Roboto"
  },
  title: {
    fontSize: "xxx-large",
    fontStyle: "normal",
    color: "#1877f2",
    fontFamily: "Roboto"
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
      <div>
        <div className={classes.container}>
          <div className={classes.cockpit}>
            <h1 className={classes.title}>firm@</h1>
            <h2 className={classes.description}>All your signatures on the same platform</h2>
          </div>
          <div className={classes.login}>
          <DynamicForm
            fields={loginForm}
            onSubmitClick={this.props.onUserLogIn}
            onSubmitText="Login"
          />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);

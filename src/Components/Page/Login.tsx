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
    fontFamily: "Robotica"
  },
  cockpit: {
    width: "60%",
    marginLeft: "200px",
    marginTop: "50px"
  },
  login: {
    width: "50%",
    minWidth: "400px",
    marginTop: "30px",
    marginRight: "400px",
    maxMarginRight:"400px",
    height: "200px",
    borderRadius: "25%"
  },
  image: {
    width: "445px",
    height: "280px",
    position: "inherit" as "inherit",
    filter: "blur(1px)",
    borderTopLeftRadius: "100%",
    marginTop: "20px",
    paddingRight: "20px"
  },
  description: {
    width: "400px",
    height: "100px",
    position: "absolute" as 'absolute',
    marginTop: "-20px",
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
        <h2>firm@</h2>
        {this.state.message}
        <div className={classes.container}>
          <div className={classes.cockpit}>
            <h1 className={classes.description}>All your signatures on the same platform</h1>
            <img src={Logo} className={classes.image}></img>
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

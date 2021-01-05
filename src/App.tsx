import { red } from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Header from "./Components/Header/Header";
import User from "./Components/User/User";
import Contacts from "./Components/Page/Contacts";
import CreateSignature from "./Components/Page/CreateSignature";
import ReceivedSignature from "./Components/Page/ReceivedSignature";
import Login from "./Components/Page/Login";

export interface AppProps {
  classes: any;
  pickedForm: string;
}

const styles = withStyles({
  root: {
    width: "100%"
  },
  classes: {
    width: "100%",
    backgroundColor: red[100]
  },
  user: {
    marginLeft: "50px",
    paddingRight: "50px"
  },
  body: {
    display: "flex"
  },
  main: {
    width: "100%"
  }
});

export interface state {
  form: string;
  isAuth: boolean;
  message?: string;
}

class App extends Component<AppProps, state> {
  constructor(props: AppProps) {
    super(props);
    this.state = { form: "/", isAuth: false, message: "backup server off" };
    this.pickForm = this.pickForm.bind(this);
    this.onUserLogIn = this.onUserLogIn.bind(this);
    this.onUserLogOut = this.onUserLogOut.bind(this);
  }

  pickForm(clicked: string) {
    console.log(clicked);
    this.setState({ form: clicked });
  }

  renderSwitch(param: string) {
    switch (param) {
      case "/":
        return <h1>home</h1>;
      case "/create":
        return <CreateSignature />;
      case "/send":
        return <h1>send</h1>;
      case "/received":
        return <h1>received</h1>;
      case "/contacts":
        return <h1>contacts</h1>;
    }
  }

  onUserLogIn() {
    this.setState({ form: "/", isAuth: true, message: "" });
  }
  onUserLogOut() {
    this.setState({ isAuth: false });
  }

  componentDidMount() {
    //GET message from server using fetch api
    fetch("/api/secret", {
      method: "get",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*"
      })
    })
      .then((res) => res.text())
      .then((res) => this.setState({ message: res }));
  }

  render() {
    const { classes, pickedForm } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          {this.state.isAuth ? (
            <div>
              <Header
                pickForm={this.pickForm}
                onUserLogOut={this.onUserLogOut}
              />
              <div className={classes.body}>
                <div className={classes.user}>
                  <User />
                </div>
                <div className={classes.main}>
                  {this.renderSwitch(this.state.form)}
                </div>
              </div>
            </div>
          ) : (
            <Route path="/">
              <Login onUserLogIn={this.onUserLogIn} />
            </Route>
          )}
          <ul>
            <li>
              <Link to="/secret">Secret</Link>
            </li>
          </ul>
          <p>{this.state.message}</p>
          <Route path="/secret">
            <div>{this.state.message}</div>
          </Route>
        </div>
      </Router>
    );
  }
}

export default styles(App);

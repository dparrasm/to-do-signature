import { red } from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import CreateSignature from "./pages/createSignature/CreateSignature";
import ReceivedSignature from "./pages/receivedSignature/ReceivedSignature";
import Login from "./pages/login/Login";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/header/Header";
import SearchBar from "./components/searchBar/SearchBar";
import User from "./components/user/User";
import { loadUser } from "./reducers/actions/authActions";
import setAuthToken from "./utils/setAuthToken";

export interface AppProps {
  classes: any;
  pickedForm: string;
}

const styles = withStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  classes: {
    width: "100%",
    backgroundColor: red[100],
  },
  user: {
    width: "15%",
    minWidth: "160px",
    paddingRight: "50px",
    marginTop: "20px",
  },
  body: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto",
  },
  main: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
  },
  webPage: {
    marginTop: "20px",
    width: "50%",
  },
});

export interface state {
  form: string;
  isAuth: boolean;
}

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component<AppProps, state> {
  constructor(props: AppProps) {
    super(props);
    this.state = { form: "/", isAuth: false };
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
        return <ReceivedSignature />;
      case "/contacts":
        return <h1>contacts</h1>;
    }
  }

  onUserLogIn() {
    this.setState({ form: "/", isAuth: true });
  }
  onUserLogOut() {
    this.setState({ isAuth: false });
  }
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
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
                  <div className={classes.webPage}>
                    <SearchBar />
                    {this.renderSwitch(this.state.form)}
                  </div>
                </div>
              </div>
            ) : (
              <Route path="/">
                <Login onUserLogIn={this.onUserLogIn} />
              </Route>
            )}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default styles(App);

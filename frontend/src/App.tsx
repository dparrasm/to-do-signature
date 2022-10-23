import { red } from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./pages/login/Login";
import SignDocument from "./components/detailedSign/signDocument/SignDocument";
import "./comun.scss";
import Header from "./components/header/Header";
import SearchBar from "./components/searchBar/SearchBar";
import User from "./components/user/User";
import { loadUser } from "./reducers/actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import CreateSignature from "./pages/createSignature/CreateSignature";
import ReceivedSignature from "./pages/receivedSignature/ReceivedSignature";
import UserProfile from "./pages/userProfile/UserProfile";

export interface AppProps {
  classes: any;
  path?: string;
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
    minWidth: "200px",
    paddingRight: "50px",
    //marginTop: "20px",
  },
  body: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto",
    height: "100%",
  },
  main: {
    width: "100%",
    flexDirection: "row",
    display: "flex",
  },
  webPage: {
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  link: {
    textDecoration: "none" as "none",
    color: "red",
    lineHeight: "25px",
  },
});

export interface state {
  isAuth: boolean;
  path?: string;
}

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component<AppProps, state> {
  constructor(props: AppProps) {
    super(props);
    this.state = { isAuth: false };
    this.onUserLogIn = this.onUserLogIn.bind(this);
    this.onUserLogOut = this.onUserLogOut.bind(this);
  }

  componentDidMount() {
    store.dispatch(loadUser());
    this.setState({ path: document.location.pathname });
  }

  onUserLogIn() {
    this.setState({ isAuth: true });
  }

  onUserLogOut() {
    this.setState({ isAuth: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router>
          <Switch>
            <Route path="/sign">
              <SignDocument />
            </Route>

            {this.state.isAuth ? (
              <div className={classes.provisional}>
                <Header onUserLogOut={this.onUserLogOut} />
                <div className={classes.body}>
                  {/* <div className={classes.user}>
                    <User />
                  </div> */}
                  <div className={classes.webPage}>
                    <Route path="/signed">
                      <div>
                        <h1>Signed</h1>
                        <CreateSignature />
                      </div>
                    </Route>
                    <Route path="/profile">
                      <div>
                        <UserProfile />
                      </div>
                    </Route>
                    <Route path="/manage">
                      <ReceivedSignature />
                    </Route>
                    <Route exact path="/">
                      <Redirect to="/home" />
                    </Route>
                    <Route path="/home">
                      <div>
                        <h1>Home</h1>
                        <CreateSignature />
                      </div>
                    </Route>
                    <Route path="/user">
                      <UserProfile />
                    </Route>
                  </div>
                </div>
              </div>
            ) : (
              <Login onUserLogIn={this.onUserLogIn} />
            )}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default styles(App);

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./pages/login/Login";
import "./comun.scss";
import Header from "./components/header/Header";
import { loadUser } from "./reducers/actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import Manage from "./pages/manage/Manage";
import UserProfile from "./pages/userProfile/UserProfile";
import SignDocument from "./pages/signing/signDocument/SignDocument";
import Home from "./pages/home/Home";
import PrepareEnvelope from "./pages/prepareEnvelope/PrepareEnvelope";

export interface AppProps {
  classes: any;
  path?: string;
}

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
  }

  onUserLogIn() {
    this.setState({ isAuth: true });
  }

  onUserLogOut() {
    this.setState({ isAuth: false });
  }

  render() {
    return (
      <div className="root">
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/prepare">
              <PrepareEnvelope />
            </Route>
            <Route path="/sign">
              <SignDocument />
            </Route>
            {this.state.isAuth ? (
              <>
                <Header onUserLogOut={this.onUserLogOut} />
                <div className="body">
                  <div className="webPage">
                    <Route path="/profile">
                      <UserProfile />
                    </Route>
                    <Route path="/manage/:page" component={Manage}></Route>
                    <Route exact path="/manage">
                      <Redirect to="/manage/inbox" />
                    </Route>
                    <Route path="/home">
                      <Home />
                    </Route>
                  </div>
                </div>
              </>
            ) : (
              <Login onUserLogIn={this.onUserLogIn} />
            )}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;

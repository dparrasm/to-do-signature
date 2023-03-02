import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./pages/login/Login";
import "./comun.scss";
import Header from "./components/header/Header";
import { loadUser, logout } from "./reducers/actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import Manage from "./pages/manage/Manage";
import UserProfile from "./pages/userProfile/UserProfile";
import SignDocument from "./pages/signing/signDocument/SignDocument";
import Home from "./pages/home/Home";
import PrepareEnvelope from "./pages/prepareEnvelope/PrepareEnvelope";
import { useDispatch, useSelector } from "react-redux";
import { resetDocumentsState } from "./reducers/actions/documentActions";
import { rootState } from "./reducers";

export const App = () => {
  const isAuthenticated = useSelector(
    (state: rootState) => state?.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    dispatch(loadUser());
  });

  const onUserLogOut = () => {
    setAuthToken(null);
    dispatch(logout());
    dispatch(resetDocumentsState);
  };

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
          {isAuthenticated ? (
            <>
              <Header onUserLogOut={onUserLogOut} />
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
            <>
              <Login />
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;

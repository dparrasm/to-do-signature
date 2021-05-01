import { red } from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login/Login";
import SignDocument from "./components/detailedSign/signDocument/SignDocument";
import "./comun.scss";
//Redux
import Header from "./components/header/Header";
import SearchBar from "./components/searchBar/SearchBar";
import User from "./components/user/User";
import { loadUser } from "./reducers/actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import MainView from "./pages/mainView/MainView";

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
    minWidth: "200px",
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
    textAlign: "center",
  },
  link: {
    textDecoration: "none" as "none",
    // color: "#717171",
    color: "red",
    lineHeight: "25px",
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
      <div className={classes.root}>
        <Router>
          {this.state.isAuth ? (
            <div>
              <Header onUserLogOut={this.onUserLogOut} />
              {this.state.form !== "/sign" ? (
                <div className={classes.body}>
                  <div className={classes.user}>
                    <User />
                  </div>
                  <div className={classes.webPage}>
                    <SearchBar />
                    <MainView />
                  </div>
                </div>
              ) : (
                <SignDocument />
              )}
            </div>
          ) : (
            <Login onUserLogIn={this.onUserLogIn} />
          )}
        </Router>
      </div>
    );
  }
}

export default styles(App);

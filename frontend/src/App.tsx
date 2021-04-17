import { red } from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import CreateSignature from "./pages/createSignature/CreateSignature";
import ReceivedSignature from "./pages/receivedSignature/ReceivedSignature";
import Login from "./pages/login/Login";
import "./comun.scss";
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
});

export interface state {
  form: string;
  isAuth: boolean;
}

class App extends Component<AppProps, state> {
  constructor(props: AppProps) {
    super(props);
    this.state = { form: "/", isAuth: true };
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
        return (
          <div>
            <h1>Home</h1>
            <CreateSignature />
          </div>
        );
      case "/signed":
        return (
          <div>
            <h1>Signed</h1>
            <CreateSignature />
          </div>
        );
      case "/documents":
        return (
          <div>
            <h1>Documents</h1>
            <CreateSignature />
          </div>
        );
      case "/send":
        return (
          <div>
            <h1>Send</h1>
            <CreateSignature />
          </div>
        );
      case "/received":
        return <ReceivedSignature />;
      case "/contacts":
        return (
          <div>
            <h1>Contacts</h1>
            <CreateSignature />
          </div>
        );
      case "/user":
        return (
          <div>
            <h1>User</h1>
            <CreateSignature />
          </div>
        );
      default:
        return <h1>Ruta no definida</h1>;
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
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
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
                    <User pickForm={this.pickForm} />
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

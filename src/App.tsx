
import { red } from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import User from "./Components/User/User";
import Contacts from "./pages/Contacts";
import CreateSignature from "./pages/CreateSignature";
import ReceivedSignature from "./pages/ReceivedSignature";


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
    marginLeft: '50px',
    paddingRight: '50px'
  },
  body: {
    display: 'flex'
  },
  main: {
    width: '100%'
  }
});
export interface state {
  form: string;
}

class App extends Component<AppProps, state> {

  constructor(props: AppProps) {
    super(props);
    this.state = { form: "/" }
    this.pickForm = this.pickForm.bind(this);
  }

  pickForm(clicked: string) {
    console.log(clicked);
    this.setState({ form: clicked })
  }
  renderSwitch(param: string) {
    switch (param) {
      case "/":
        return <h1>home</h1>;
      case "/create":
        return <CreateSignature/>;
      case "/send":
        return <h1>send</h1>;
      case "/received":
        return <h1>received</h1>;
      case "/contacts":
        return <h1>contacts</h1>;
    }
  }

  render() {
    const { classes, pickedForm } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <Header pickForm={this.pickForm} />
          <div className={classes.body}>
          <div className={classes.user}>
              <User />
            </div>
            <div className={classes.main}>
              {this.renderSwitch(this.state.form)}
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default styles(App);

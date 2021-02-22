import { Toolbar, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import React, { Component } from "react";
import Button from "../Button";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { icons } from "./icons";

const styles = withStyles((theme) => ({
  menuIcon: {
    marginRight: "10px"
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    color: "grey",
    height: "60px",
    minHeight: "60px",
    backgroundColor: "white",
    
    border: "1px solid #e0e0de"
  },
  toolBar: {
    marginTop: "-9px",
  },
  iconBar: {
    width: "40%",
    display: "inline-flex",
    listStyleType: "none"
  },
  iconBarElement: {
    marginTop: "10px",
    marginLeft: "100px",
    fontSize: "18px",
    paddingBottom: "-10px"
  },
  logout: {
    marginLeft: '180px',
    marginTop: '15px'
  },
  link: {
    textDecoration: "none" as "none",
    color: "#717171"
  },
  logo: {
    textDecoration: "none" as "none",
    color: "#1877f2"
  }
}));

export interface HeaderProps {
  classes?: any;
  form?: string;
  pickForm: any;
  onUserLogOut: any;
}

class Header extends Component<HeaderProps, any> {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div>
          <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.toolBar}>
              <Link className={classes.logo} to="/" onClick={() => this.props.pickForm("/")}>
                <Typography variant="h5">firm@</Typography>
              </Link>
              <ul className={classes.iconBar}>
                <li
                  className={classes.iconBarElement}
                  onClick={() => this.props.pickForm("/send")}
                >
                  <Link
                    className={classes.link}
                    to="/send">
                    <Button icon={icons.send} text="Send" />
                  </Link>
                </li>
                <li
                  className={classes.iconBarElement}
                  onClick={() => this.props.pickForm("/received")}
                >
                  <Link 
                    className={classes.link}
                    to="/received">
                    <Button icon={icons.received} text="Inbox" />
                  </Link>
                </li>
                <li className={classes.iconBarElement}>
                  <Link
                    className={classes.link}
                    to="/create"
                    onClick={() => this.props.pickForm("/create")}
                  >
                    <Button icon={icons.create} text="Signed" />
                  </Link>
                </li>
                <li
                  className={classes.iconBarElement}
                  onClick={() => this.props.pickForm("/contacts")}
                >
                  <Link 
                    className={classes.link}
                    to="/contacts">
                    <Button icon={icons.contacts} text="Contacts" />
                  </Link>
                </li>
              </ul>
            </Toolbar>
            <Link to="/" className={classes.logout}>
                    <button onClick={this.props.onUserLogOut}>Log out</button>
            </Link>
          </AppBar>
        </div>
      </Router>
    );
  }
}

export default styles(Header);

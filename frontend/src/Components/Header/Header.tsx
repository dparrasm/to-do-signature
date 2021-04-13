import { Toolbar, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from "@material-ui/core/Typography/Typography";
import React, { Component } from "react";
// import IconButton from "../conButton/IconButton";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { icons } from "../../utils/icons";
import IconButton from "../iconButton/IconButton";

const styles = withStyles({
  menuIcon: {
    marginRight: "10px",
  },
  appBar: {
    color: "grey",
    height: "60px",
    minHeight: "60px",
    backgroundColor: "white",
    border: "1px solid #e0e0de",
  },
  toolBar: {
    height: "60px",
    minHeight: "60px",
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconBar: {
    padding: "0px",
    display: "inline-flex",
    listStyleType: "none",
    width: "50%",
    justifyContent: "space-around",
  },
  iconBarElement: {
    marginTop: "10px",
    fontSize: "18px",
    paddingBottom: "-10px",
  },
  logout: {
    marginTop: "15px",
  },
  link: {
    textDecoration: "none" as "none",
    color: "#717171",
  },
  logo: {
    textDecoration: "none" as "none",
    color: "#1877f2",
  },
  iconContainer: {
    width: "15%",
    minWidth: "160px",
    paddingRight: "50px",
    display: "flex",
    justifyContent: "center",
  },
  logoutContainer: {
    paddingLeft: "35px",
    borderLeftStyle: "solid" as "solid",
    borderWidth: "1px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderColor: "#e0e0de",
  },
});

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
        <div className={classes.header}>
          <div className={classes.appBar}>
            <div className={classes.toolBar}>
              <div className={classes.iconContainer}>
                <Link
                  className={classes.logo}
                  to="/"
                  onClick={() => this.props.pickForm("/")}
                >
                  <Typography variant="h5">firm@</Typography>
                </Link>
              </div>
              <ul className={classes.iconBar}>
                <li
                  className={classes.iconBarElement}
                  onClick={() => this.props.pickForm("/send")}
                >
                  <Link className={classes.link} to="/documents">
                    <IconButton icon={icons.documents} text="Documents" />
                  </Link>
                </li>
                <li
                  className={classes.iconBarElement}
                  onClick={() => this.props.pickForm("/send")}
                >
                  <Link className={classes.link} to="/send">
                    <IconButton icon={icons.send} text="Send" />
                  </Link>
                </li>
                <li
                  className={classes.iconBarElement}
                  onClick={() => this.props.pickForm("/received")}
                >
                  <Link className={classes.link} to="/received">
                    <IconButton icon={icons.received} text="Inbox" />
                  </Link>
                </li>
                <li className={classes.iconBarElement}>
                  <Link
                    className={classes.link}
                    to="/create"
                    onClick={() => this.props.pickForm("/signed")}
                  >
                    <IconButton icon={icons.signed} text="Signed" />
                  </Link>
                </li>
                <li
                  className={classes.iconBarElement}
                  onClick={() => this.props.pickForm("/contacts")}
                >
                  <Link className={classes.link} to="/contacts">
                    <IconButton icon={icons.contacts} text="Contacts" />
                  </Link>
                </li>
                <li>
                  <div className={classes.logoutContainer}>
                    <Link to="/" className={classes.logout}>
                      <button onClick={this.props.onUserLogOut}>Log out</button>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default styles(Header);

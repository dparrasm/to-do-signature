import { Toolbar, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography/Typography";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import Button from "../Button";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { icons } from "../../Assets/icons";

const styles = withStyles((theme) => ({
  menuIcon: {
    marginRight: "10px"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    marginTop: "3px",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "25px",
    marginTop: "6px"
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    color: "grey",
    height: "55px",
    minHeight: "55px",
    backgroundColor: "white"
  },
  toolBar: {
    marginTop: "-9px"
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
  }
}));

export interface HeaderProps {
  classes?: any;
  form?: string;
  pickForm: any;
  onUserLogOut: any;
}

class Header extends Component<HeaderProps, any> {
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    const { classes, pickForm } = this.props;
    return (
      <Router>
        <div>
          <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.toolBar}>
              <Link to="/" onClick={() => this.props.pickForm("/")}>
                <Typography variant="h6">firm@</Typography>
              </Link>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>

              <ul className={classes.iconBar}>
                <li className={classes.iconBarElement}>
                  <Link
                    to="/create"
                    onClick={() => this.props.pickForm("/create")}
                  >
                    <Button icon={icons.create} text="Create" />
                  </Link>
                </li>
                <li
                  className={classes.iconBarElement}
                  onClick={() => this.props.pickForm("/send")}
                >
                  <Link to="/send">
                    <Button icon={icons.send} text="Send" />
                  </Link>
                </li>
                <li
                  className={classes.iconBarElement}
                  onClick={() => this.props.pickForm("/received")}
                >
                  <Link to="/received">
                    <Button icon={icons.received} text="Received" />
                  </Link>
                </li>
                <li
                  className={classes.iconBarElement}
                  onClick={() => this.props.pickForm("/contacts")}
                >
                  <Link to="/contacts">
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

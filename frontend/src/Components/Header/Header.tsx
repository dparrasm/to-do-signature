import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import IconButton from "../conButton/IconButton";
import { icons } from "../../utils/icons";
import IconButton from "../iconButton/IconButton";
import { connect, ConnectedProps } from "react-redux";
import { logout } from "../../reducers/actions/authActions";
import { setPath } from "../../reducers/actions/routerActions";
import "../../comun.scss";

const styles = withStyles({
  menuIcon: {
    marginRight: "10px",
  },
  appBar: {
    color: "grey",
    height: "60px",
    minHeight: "60px",
    backgroundColor: "white",
    borderBottom: "1px solid #e0e0de",
  },
  toolBar: {
    height: "60px",
    minHeight: "60px",
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
  },
  iconBar: {
    height: "100%",
    padding: "0px",
    display: "inline-flex",
    alignItems: "center",
    listStyleType: "none",
    width: "100%",
    justifyContent: "space-around",
  },
  iconBarElement: {
    height: "100%",
    width: "10%",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    //borderBottom: "1px solid black",
  },
  link: {
    textDecoration: "none" as "none",
    color: "#717171",
    lineHeight: "25px",
    "&:hover": {
      color: "#1877f2",
    },
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
    justifyContent: "end",
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
  onUserLogOut: any;
  auth: any;
  logout: any;
}

class Header extends Component<
  HeaderProps & ConnectedProps<typeof connector>,
  any
> {
  logout = () => {
    this.props.onUserLogOut();
    this.props.logout();
  };

  redirect = (path: string) => {
    this.props.setPath(path);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.header}>
        <div className={classes.appBar}>
          <div className={classes.toolBar}>
            <div className={classes.iconContainer}>
              <div onClick={() => this.redirect("/")}>
                <h1 className="firma-title header">firm@</h1>
              </div>
            </div>
            <ul className={classes.iconBar}>
              <li
                className={classes.iconBarElement}
                onClick={() => this.redirect("/home")}
              >
                <Link className={classes.link} to="/home">
                  Home
                </Link>
              </li>
              <li
                className={classes.iconBarElement}
                onClick={() => this.redirect("/manage")}
              >
                <Link className={classes.link} to="/manage">
                  Manage
                </Link>
              </li>
              <li
                className={classes.iconBarElement}
                onClick={() => this.redirect("/report")}
              >
                <Link className={classes.link} to="/report">
                  Reports
                </Link>
              </li>
              <li
                className={classes.iconBarElement}
                onClick={() => this.redirect("/profile")}
              >
                <Link className={classes.link} to="/profile">
                  Profile
                </Link>
              </li>
              <li onClick={this.logout}>
                <div className={classes.logoutContainer}>
                  <Link
                    to="/"
                    onClick={() => this.redirect("/")}
                    className={classes.link}
                  >
                    <IconButton icon={icons.logout} text="Logout" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  path: state.path,
});
const connector = connect(mapStateToProps, { logout, setPath });
export default connector(styles(Header));

import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { icons } from "../../utils/icons";
import IconButton from "../iconButton/IconButton";
import { connect, ConnectedProps } from "react-redux";
import { logout } from "../../reducers/actions/authActions";
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
    minWidth: "200px",
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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.header}>
        <div className={classes.appBar}>
          <div className={classes.toolBar}>
            <div className={classes.iconContainer}>
              <div>
                <h1 className="firma-title header">firm@</h1>
              </div>
            </div>
            <ul className={classes.iconBar}>
              <li className={classes.iconBarElement}>
                <Link className={classes.link} to="/home">
                  Home
                </Link>
              </li>
              <li className={classes.iconBarElement}>
                <Link className={classes.link} to="/manage">
                  Manage
                </Link>
              </li>
              <li className={classes.iconBarElement}>
                <Link className={classes.link} to="/profile">
                  Profile
                </Link>
              </li>
              <li onClick={this.logout}>
                <div className={classes.logoutContainer}>
                  <Link to="/" className={classes.link}>
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
});
const connector = connect(mapStateToProps, { logout });
export default connector(styles(Header));

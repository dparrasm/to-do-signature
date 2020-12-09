import classes from "*.module.css";
import { withStyles } from "@material-ui/core";
import React, { Component } from "react";

const styles = {
  container: {
    height: "400px",
    width: "200px",
    background: "white",
    boxShadow: "0px 0px 5px 3px rgba(213,213,217,1)"
  }
};

interface UserProps {
  classes?: any;
}

class User extends Component<UserProps, any> {
  constructor(props: UserProps) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <p>User</p>
        <div className={classes.container}></div>
      </div>
    );
  }
}

export default withStyles(styles)(User);

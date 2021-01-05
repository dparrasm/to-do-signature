import classes from "*.module.css";
import { withStyles } from "@material-ui/core";
import React, { Component } from "react";

const styles = {
  container: {
    height: "400px",
    width: "225px",
    background: "white",
    boxShadow: "0px 0px 5px 3px rgba(213,213,217,1)"
  },
  cover: {
    width: '100%',
    height: '25%'
  },
  image: {
    backgroundColor: 'red',
    height: '80px',
    width: '80px',
    borderRadius: '50%',
    marginTop:'-40px',
    position: 'absolute' as 'absolute',
    marginLeft: '75px'
  },
  description: {
    height: '75%',
    width: '100%',
    backgroundColor: 'blue',
    borderBottomRigthRadius: '10%'
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
        <div className={classes.container}>
          <div className={classes.cover}>portada</div>
          <div className={classes.image}>Image</div>
          <div className={classes.description}>Notificationes</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(User);

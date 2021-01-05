import classes from "*.module.css";
import { withStyles } from "@material-ui/core";
import React, { Component } from "react";

const styles = {
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: 'none',
    borderRadius: '5%'
  },
  cover: {
    width: '100%',
    height: '50px'
  },
  image: {
    backgroundColor: 'red',
    height: '70px',
    width: '70px',
    borderRadius: '50%',
    marginTop:'-40px',
    position: 'absolute' as 'absolute',
    marginLeft: '75px'
  },
  description: {
    height: '250px',
    width: '100%',
    backgroundColor: 'blue',
    borderBottomRightRadius: '5%',
    borderBottomLeftRadius: '5%',
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

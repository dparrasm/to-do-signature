import classes from "*.module.css";
import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Avatar } from '@material-ui/core';
import cover from './cover.jpeg';

const styles = {
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: 'none',
    display: "flex",
    flexDirection: 'column' as 'column',
    justifyContent: "center",
    alignItems: "center"
  },
  cover: {
    width: '100%',
    height: '60px',
    borderStyle: 'solid',
    borderColor: '#e0e0de',
    borderTopLeftRadius: '5%',
    borderTopRightRadius: '5%',
    borderBottomStyle: 'none' as 'none',
    borderWidth: '1px'
  },
  image: {
    backgroundColor: '#c6dafc',
    height: '65px',
    width: '65px',
    borderRadius: '50%',
    marginTop:'-40px',
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" as "relative",
    borderStyle: 'solid',
    borderWidth: '1px'
  },
  description: {
    height: '250px',
    borderColor: '#e0e0de',
    width: '100%',
    backgroundColor: '#f3f2f0',
    borderStyle: 'solid',
    borderBottomRightRadius: '5%',
    borderBottomLeftRadius: '5%',
    marginTop: '-30px',
    paddingTop: '40px',
    borderWidth: '1px',
    textAlign: 'center' as 'center'
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
        <div className={classes.container}>
          <img className={classes.cover} src={cover}/>
          <Avatar className={classes.image} src="./avatar.jpg"/>
          <div className={classes.description}>
            Monsieur Dupont
            <p>Pending signatures: 6</p>
            <p>Received signatures: 1</p>
            </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(User);

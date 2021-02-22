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
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
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
    borderStyle: 'solid',
    borderColor: '#e0e0de',
    borderWidth: '1px',
    width: '100%',
    backgroundColor: '#fff',
    borderBottomRightRadius: '15px',
    borderBottomLeftRadius: '15px',
    marginTop: '-30px',
    paddingTop: '40px',
    textAlign: 'center' as 'center'
  }
};

interface UserProps {
  classes?: any;
}

class User extends Component<UserProps, any> {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <img alt="cover" className={classes.cover} src={cover}/>
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

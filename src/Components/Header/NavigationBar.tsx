import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LogoIcon from '@material-ui/icons/Stars';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  transparentBar: {
    backgroundColor: 'red !important',
    boxShadow: 'none',
    color: '#FFFFFF',
  }
};
export interface NavBarProps {
    classes: any;
}

class NavigationBar extends Component<NavBarProps, any> {
    
    constructor(props: NavBarProps){
        super(props);
    }

  render() {
    
    const { classes } = this.props;
    return (
      <AppBar className={classes.transparentBar}>
        <Toolbar>
        <LogoIcon></LogoIcon>


        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(NavigationBar);
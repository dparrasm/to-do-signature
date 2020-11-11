import { red } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import IconAvatar from './Components/IconAvatar';
import Header from './Header/Header';
import NavigationBar from './Header/NavigationBar';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  classes: {
    width: '100%',
    backgroundColor: red[100],
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header/>
  </div>
  );
}

export default App;

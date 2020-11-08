import { red } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import Header from './header/Header';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  clase: {
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

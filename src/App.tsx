import { red } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import Header from './Components/Header/Header';

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

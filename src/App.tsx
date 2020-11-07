import { red } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
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
    <Typography className={classes.clase} variant="h1">
      Portafirma, si señor
    </Typography>
  </div>
  );
}

export default App;

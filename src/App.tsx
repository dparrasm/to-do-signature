import { red } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import Header from './Header/Header';
import DynamicForm, { formFields } from './Components/DynamicForm';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  classes: {
    width: '100%',
    backgroundColor: red[100],
  }
});

const createSignature: formFields[] = [
  { id:"123asd",
    label: "Hello world",
    type:"text",
    placeholder: "Compadre"
  },
  { id:"123asf",
  label: "Hello sun",
  type:"password",
  placeholder: "bro"
}
]
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header/>
      <DynamicForm fields={createSignature} />
  </div>
  );
}

export default App;

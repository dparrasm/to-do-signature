import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from "react-redux";
import store from "./store";
ReactDOM.render(
  <React.Fragment>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

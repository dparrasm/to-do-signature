import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';

//This object will contains all the reducers we create.
export default combineReducers({
    alert,
    auth,
});
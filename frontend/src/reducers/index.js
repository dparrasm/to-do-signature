import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import router from './routerReducer';

//This object will contains all the reducers we create.
export default combineReducers({
    alert,
    auth,
    router
});
import axios from 'axios'; 
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// Register User
export const register = ({ name, surname, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

const body = JSON.stringify({ name, surname, email, password});

try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })
} catch(err){
    dispatch({
        type: REGISTER_FAIL
    })
}

}
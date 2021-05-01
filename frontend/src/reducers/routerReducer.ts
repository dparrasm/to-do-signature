import { SET_PATH } from './actions/types'
const initialState = {} as any;

export default function(state = initialState, action) {
    const {type , payload} = action;
    switch(type){
        case SET_PATH:
            return {...state, path: payload.path};
        default: 
            return state;
    }
}
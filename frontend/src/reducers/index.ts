import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import document from "./documentReducer";
import envelope from "./envelopeReducer";

//This object will contains all the reducers we create.
export const rootReducer = combineReducers({
  alert,
  auth,
  document,
  envelope,
});

export type rootState = ReturnType<typeof rootReducer>;

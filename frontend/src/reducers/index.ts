import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import router from "./routerReducer";
import document from "./documentReducer";

//This object will contains all the reducers we create.
export const rootReducer = combineReducers({
  alert,
  auth,
  router,
  document,
});

export type rootState = ReturnType<typeof rootReducer>;

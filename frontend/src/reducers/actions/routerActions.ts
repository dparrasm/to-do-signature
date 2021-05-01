import { SET_PATH } from "./types";

export const setPath = (path) => (dispatch) => {
  dispatch({
    type: SET_PATH,
    payload: { path },
  });
};
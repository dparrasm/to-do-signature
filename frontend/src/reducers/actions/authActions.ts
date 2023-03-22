import axios from "axios";
import { setAlert } from "./alertActions";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_UPDATED,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";
import { UserSignUp } from "../../domain/user";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const updateUser = (user) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const newUser = await axios.get("/api/auth");
    const body = { ...user, _id: newUser.data._id };
    const res = await axios.put("/api/users", body, config);
    dispatch({
      type: USER_UPDATED,
      payload: res.data,
    });
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
  }
};
// Register User
export const register = (user: UserSignUp) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  const body = JSON.stringify(user);

  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err: any) {
    const errors = err?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const deleteUser = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const user = await axios.get("/api/auth");
    console.log(JSON.stringify(user));
    await axios.delete("/api/auth/" + user?.data?._id, config);
    dispatch({
      type: LOGOUT,
    });
  } catch (err: any) {
    const errors = err?.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
  }
};
export const passwordResetRequest = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email: email });
  try {
    await axios.put("/api/users/passwordResetRequest", body, config);
  } catch (err: any) {
    const errors = err?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => console.log(error));
    }
  }
};

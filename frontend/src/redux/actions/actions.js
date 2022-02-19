import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  LOGOUT_USER,
  SIGNUP_REQUEST_FAIL,
} from "../constants/userConstants";
import Cookies from "universal-cookie";
import baseUrl from "../API/baseUrl";

export const OPEN_MODAL = "OPEN_MODAL";
export const REMOVE_MODAL = "REMOVE_MODAL";
const url = process.env.REACT_APP_DEV_URL;

export const handleOpen = (task) => {
  return {
    type: OPEN_MODAL,
    payload: {
      open: true,
      openTask: task,
    },
  };
};
export const handleCLose = () => {
  return {
    type: REMOVE_MODAL,
    payload: {
      open: false,
      openTask: {},
    },
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/users/logout`);
      if (response.ok) {
        const cookies = new Cookies();
        cookies.remove("jwt");
        cookies.remove("user");
        dispatch({ type: LOGOUT_USER });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const requestBody = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };

      const response = await fetch(`${baseUrl}/users/login`, requestBody);
      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;
        const cookies = new Cookies();
        const today = new Date();
        const tomorrow = new Date(today);
        const expiryDate = new Date(tomorrow.setDate(tomorrow.getDate() + 2));
        cookies.set("jwt", token, { expires: expiryDate });
        cookies.set("user", user, { expires: expiryDate });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
      } else {
        // const data = await response.json();
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: "Your email or password is wrong. Please try again.",
        });
      }
      // TODO: Establish backend error handling and update the dispatch accordingly
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: error });
    }
  };
};

export const addUserDetails = (user) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: { ...user } });
  };
};

export const signUpUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      const response = await fetch(`${baseUrl}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user }),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: SIGNUP_REQUEST_SUCCESS, payload: data });
      } else {
        const data = await response.json();
        if (data.errors.email) {
          dispatch({ type: SIGNUP_REQUEST_FAIL, payload: data.errors.email });
        }
      }
    } catch (error) {
      dispatch({ type: SIGNUP_REQUEST_FAIL, payload: error });
    }
  };
};

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../constants/userConstants";
import Cookies from "universal-cookie";
import baseUrl from "../API/baseUrl";
export const OPEN_MODAL = "OPEN_MODAL";
export const REMOVE_MODAL = "REMOVE_MODAL";

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
        console.log(data);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
      } else {
        const data = await response.json();
        console.log(data);
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


import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,LOGOUT_USER  } from "../constants/userConstants";

import { initialStore } from "../store";

export const userReducer = (state = initialStore.user, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        loading: true,
        authenticated: false,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        loading: false,
        authenticated: true,
        userDetails: action.payload
      };
    }
    case USER_LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        authenticated: false,
        userDetails: {},
        error: action.payload
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        loading: false,
        authenticated: false,
        userDetails: {},
      };
    }
    default:
      return state;
  }
};

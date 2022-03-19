
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, LOGOUT_USER,  SIGNUP_REQUEST,
  SIGNUP_REQUEST_FAIL, SIGNUP_REQUEST_SUCCESS   } from "../constants/userConstants";

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


export const userSignUpReducer = (state = {}, action) => {
  switch(action.type){
    case SIGNUP_REQUEST:
      return {
       loading: true 
      }
    case SIGNUP_REQUEST_SUCCESS: 
      return {
        loading: false,
        userDetails: action.payload,
        success: true
    }
    case SIGNUP_REQUEST_FAIL: {
      return {
        loading: false,
        error: action.payload
      }
    }
    default:
      return state
  }
}
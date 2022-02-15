import { LOGIN_USER, LOGOUT_USER } from "../actions";
import { initialStore } from "../store";

export const userReducer = (state = initialStore.user, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        authenticated: true,
        userDetails: action.payload,
      };
    }
    case LOGOUT_USER: {
      return {
        authenticated: false,
        userDetails: {},
      };
    }
    default:
      return state;
  }
};

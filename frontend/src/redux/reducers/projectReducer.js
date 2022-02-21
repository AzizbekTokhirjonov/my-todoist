import { GET_PROJECTS } from "../constants/projectConstants.js";
import { initialStore } from "../store";

export const projectReducer = (state = initialStore.projects, action) => {
  switch (action.type) {
    case GET_PROJECTS: {
      return {
        list: action.payload,
      };
    }
    default:
      return state;
  }
};

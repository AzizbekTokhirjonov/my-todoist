import {
  ADD_PROJECT_SECTIONS,
  GET_PROJECTS,
  REMOVE_PROJECT_SECTIONS,
  ADD_PROJECT,
  REMOVE_PROJECT,
} from "../constants/projectConstants.js";
import { initialStore } from "../store";

export const projectReducer = (state = initialStore.projects, action) => {
  switch (action.type) {
    case GET_PROJECTS: {
      return {
        ...state,
        list: action.payload,
      };
    }
    case ADD_PROJECT: {
      return {
        ...state,
        projectFromState: action.payload,
      };
    }
    case REMOVE_PROJECT: {
      return {
        ...state,
        projectFromState: {},
      };
    }
    case ADD_PROJECT_SECTIONS: {
      return {
        ...state,
        projectSections: action.payload,
      };
    }
    case REMOVE_PROJECT_SECTIONS: {
      return {
        ...state,
        projectSections: {},
      };
    }
    default:
      return state;
  }
};
